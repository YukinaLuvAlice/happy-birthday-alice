import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { details } from 'framer-motion/client';

type Wish = {
  Id: number;
  WishText: string;
  CreatedAt: string;
};

export async function POST(request: Request) {
  try {
    const { wish } = await request.json();
    console.log('Received wish:', wish);
    if (!wish || typeof wish !== 'string') {
      return NextResponse.json(
        { error: 'Invalid wish format' },
        { status: 400 }
      );
    }
    console.log('Attempting database connection...');
    const insertQuery = `
      INSERT INTO [dbo].[Wishes] (WishText)
      VALUES (@param0);
      SELECT TOP 1 * FROM [dbo].[Wishes] ORDER BY Id DESC;
    `;

    const result = await executeQuery<any[]>(insertQuery, [wish]);
    console.log('Database operation successful:', result);
    return NextResponse.json({ success: true, wish: result[0] });

  } catch (error) {
    console.error('Detailed error:', {
      message: (error as any).message,
      stack: (error as any).stack,
      code: (error as any).code,
      state: (error as any).state
    });
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save wish',
        details: (error as any).message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const wishes = await executeQuery<any[]>('SELECT * FROM [dbo].[Wishes] ORDER BY CreatedAt DESC');
    return NextResponse.json({ wishes });
  } catch (error) {
    console.error('Failed to fetch wishes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishes' },
      { status: 500 }
    );
  }
}
