interface RotationInfoProps {
  hoursUntil: number;
  nextDate: Date;
}

export default function RotationInfo({ hoursUntil, nextDate }: RotationInfoProps) {
  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-white/90 dark:bg-[#1a2332]/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-[#5C3A21]/10 dark:border-white/10 shadow-sm">
      <div className="flex flex-col items-end gap-2">
        <div className="text-right">
          <p className="text-xs text-[#5C3A21]/70 dark:text-white/70 font-light mb-1">
            Changes on:
          </p>
          <p className="text-xs sm:text-sm text-[#5C3A21] dark:text-white font-medium">
            Tuesday • Friday • Sunday
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <div className="text-xs text-[#5C3A21]/70 dark:text-white/70 font-light">
              {hoursUntil === 1 ? 'hour' : 'hours'} until next
            </div>
            <div className="text-xs text-[#5C3A21]/50 dark:text-white/50 font-light">
              {nextDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
          <div className="bg-[#8DA070]/10 dark:bg-[#5B9BD5]/20 rounded-lg px-3 sm:px-4 py-2 border border-[#8DA070]/30 dark:border-[#5B9BD5]/30 flex items-center justify-center min-w-[50px]">
            <div className="text-2xl sm:text-3xl font-light text-[#8B4513] dark:text-[#5B9BD5]">
              {hoursUntil}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

