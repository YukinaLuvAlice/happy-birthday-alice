export interface FloatingElementProps {
    emoji: string;          // Emoji hoặc nội dung muốn hiển thị
    kichThuoc?: string;     // Kích thước của emoji (CSS size value hoặc Tailwind class)
    thoiGianBay?: number;   // Thời gian để hoàn thành một chu kỳ bay
    doTre?: number;         // Độ trễ trước khi bắt đầu animation
    phamViBay?: {          // Phạm vi bay (tính theo %)
      x: number;
      y: number;
    };
}

export function FloatingElement({ 
    emoji, 
    kichThuoc = '2rem',
    thoiGianBay = 3,
    doTre = 0,
    phamViBay = { x: 100, y: 100 }
}: FloatingElementProps) {
    return (
        <div
            className={typeof kichThuoc === 'string' && kichThuoc.startsWith('text-') ? kichThuoc : undefined}
            style={{
                position: 'absolute',
                fontSize: !kichThuoc.startsWith('text-') ? kichThuoc : undefined,
                animation: `float ${thoiGianBay}s ease-in-out infinite`,
                animationDelay: `${doTre}s`,
                transform: `translate(${Math.random() * phamViBay.x}%, ${Math.random() * phamViBay.y}%)`
            }}
        >
            {emoji}
        </div>
    );
}