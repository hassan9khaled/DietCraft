/* eslint-disable react/prop-types */
function ProgressBar({
  progress,
  height,
  color,
  background,
  showLabel,
  className
}) {
  return (
    <div className={`w-full ${background} ${className}`}>
      <div
        className={`${height} ${color} transition-all duration-300 rounded-xl`}
        style={{ width: `${progress}%` }}
      />
      {showLabel && (
        <span className="text-sm">{`${Math.round(progress)}%`}</span>
      )}
    </div>
  );
}

export default ProgressBar;
