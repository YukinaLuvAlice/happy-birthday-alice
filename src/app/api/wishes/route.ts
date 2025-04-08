import { NextResponse } from 'next/server';
import supabase from '@/config/supabaseClient';

export async function POST(request: Request) {
  const { wishText } = await request.json(); // Lấy wishText từ request

  const { data, error } = await supabase
    .from('Wished')
    .insert([{ wishText }]);

  if (error) {
    console.error('Error inserting wish:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // Kiểm tra nếu data không phải là null và là một mảng
  if (!data || !Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ success: false, error: 'No data returned' }, { status: 500 });
  }

  return NextResponse.json({ success: true, wish: data[0] });
}

export async function GET() {
  const { data: wishes, error } = await supabase
    .from('Wished')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ wishes });
}