
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  size = 'md',
  color = 'bg-habit-purple',
  showLabel = true,
  className,
  labelClassName,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const heightClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }[size];
  
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className={cn("flex justify-between text-xs mb-1", labelClassName)}>
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={cn("bg-gray-100 rounded-full overflow-hidden", heightClass)}>
        <div 
          className={cn("rounded-full transition-all duration-500 ease-out", color, heightClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
