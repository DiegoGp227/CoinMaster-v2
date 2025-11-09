interface IProgressBarProps {
  text: string;
  current: number;
  target: number;
  color?: string;
}

export default function ProgressBar({
  text,
  current,
  target,
  color = "#00d9ff",
}: IProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="mb-4 w-full flex justify-between items-center gap-4">
      <p className="text-soft-gray text-sm group-hover:text-white transition-all duration-500 flex-1">
        {text}
      </p>
      <div className="w-32 h-6 bg-hard-gray rounded-full overflow-hidden border border-soft-gray">
        <div
          className="h-full transition-all duration-500 flex items-center justify-end pr-2"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        >
          <span className="text-xs text-white font-bold">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
