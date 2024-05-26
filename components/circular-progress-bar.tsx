interface CircularProgressBarProps {
  size: number
  progress: number
  children: React.ReactNode
}

export const CircularProgressBar = ({
  size,
  progress,
  children
}: CircularProgressBarProps) => {
  const radius = size / 2 - 10
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="7"
          fill="transparent"
          className="text-gray-300"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="7"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-600"
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
      <span className="absolute text-lg font-semibold">{children}</span>
    </div>
  )
}
