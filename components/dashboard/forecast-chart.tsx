import { forecast } from "@/data/mock";

export function ForecastChart() {
  const values = forecast.map((point) => point.balance.amountMinor / 100);
  const min = Math.min(...values) - 1200;
  const max = Math.max(...values) + 900;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 640;
    const y = 154 - ((value - min) / (max - min)) * 130;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,180 ${points} 640,180`;

  return (
    <div className="mt-4">
      <div className="relative h-[185px] w-full overflow-hidden">
        <div className="absolute inset-x-0 top-[24px] border-t border-dashed border-[#e8e9e6]" />
        <div className="absolute inset-x-0 top-[89px] border-t border-dashed border-[#e8e9e6]" />
        <div className="absolute inset-x-0 top-[154px] border-t border-dashed border-[#e8e9e6]" />
        <svg viewBox="0 0 640 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Balance forecast falling to £23,218 before recovering after income, ending at £26,489">
          <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3c7563" stopOpacity=".19"/><stop offset="1" stopColor="#3c7563" stopOpacity="0"/></linearGradient></defs>
          <polygon points={area} fill="url(#area)" />
          <polyline points={points} fill="none" stroke="#1f5d4b" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          <circle cx="640" cy={Number(points.split(" ").at(-1)?.split(",")[1])} r="4" fill="#fff" stroke="#1f5d4b" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="flex justify-between text-[10px] text-[#929793]">{forecast.filter((_, i) => i % 2 === 0 || i === forecast.length - 1).map((point) => <span key={point.date}>{point.date}</span>)}</div>
    </div>
  );
}
