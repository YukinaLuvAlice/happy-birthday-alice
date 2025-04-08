import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

type Wish = {
  Id: number;
  WishText: string;
  CreatedAt: string;
};

export async function POST(request: Request) {
  try {
    const { wish } = await request.json();

    if (!wish || typeof wish !== 'string') {
      return NextResponse.json(
        { error: 'Invalid wish format' },
        { status: 400 }
      );
    }

    const insertQuery = `
      INSERT INTO [dbo].[Wishes] (WishText)
      VALUES (@param0);
      SELECT TOP 1 * FROM [dbo].[Wishes] ORDER BY Id DESC;
    `;

    const result = await executeQuery<any[]>(insertQuery, [wish]);
    return NextResponse.json({ success: true, wish: result[0] });
  } catch (error) {
    console.error('Failed to save wish:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save wish' },
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
