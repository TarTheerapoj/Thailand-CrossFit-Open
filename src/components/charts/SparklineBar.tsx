interface Props {
  data: number[];
  color?: string;
}

export function SparklineBar({ data, color = "#9BEC00" }: Props) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${Math.round((v / max) * 100)}%`,
            backgroundColor: i === data.length - 1 ? color : `${color}55`,
          }}
        />
      ))}
    </div>
  );
}
