import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import moment from 'moment-timezone';

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

    // Lấy thời gian hiện tại ở múi giờ Mỹ
    const currentTime = moment().tz("America/New_York").format(); // Thay đổi múi giờ nếu cần

    // Thực hiện truy vấn để chèn điều ước vào bảng
    const query = 'INSERT INTO Wishes (WishText, CreatedAt) VALUES (@param0, @param1)';
    await executeQuery(query, [wish, currentTime]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save wish', details: (error as any).message },
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
