import React from 'react';

interface TabsIndicatorProps {
  scrollPosition: number;
  maxScroll: number;
  totalDots?: number;
  onJumpToPosition?: (position: number) => void;
}

const TabsIndicator: React.FC<TabsIndicatorProps> = ({
  scrollPosition,
  maxScroll,
  totalDots = 5,
  onJumpToPosition
}) => {
  // Calculate scroll progress (0 to 1)
  const progress = Math.min(scrollPosition / maxScroll, 1);
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-3 mb-2 py-2 relative">
      {/* Track bar - wider and more visible */}
      <div 
        className="absolute h-1.5 w-64 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
        onClick={(e) => {
          if (onJumpToPosition && maxScroll > 0) {
            // Calculate click position relative to the track
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const trackWidth = rect.width;
            const clickProgress = Math.max(0, Math.min(1, x / trackWidth));
            onJumpToPosition(clickProgress * maxScroll);
          }
        }}
      ></div>
      
      {/* Progress background fill with gradient effect */}
      <div 
        className="absolute h-1.5 left-1/2 bg-gradient-to-r from-blue-600/60 to-blue-500/40 dark:from-blue-500/50 dark:to-blue-400/30 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.max(0, progress * 64)}px`,
          transform: 'translateX(-100%)',
        }}
      ></div>
      
      {/* Moving indicator - enhanced with better glow effect */}
      <div 
        className="absolute h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.max(16, 64 * (1/totalDots))}px`,
          left: `calc(50% - 32px + ${progress * 64}px)`,
          transform: `translateX(-${progress * 100}%)`,
          boxShadow: '0 0 10px rgba(37, 99, 235, 0.8)'
        }}
      ></div>
      
      {/* Dots with improved visual feedback */}
      {Array.from({ length: totalDots }).map((_, index) => {
        // Calculate how close each dot is to being active based on scroll position
        const dotPosition = index / (totalDots - 1);
        const distanceFromCurrent = Math.abs(dotPosition - progress);
        const proximity = Math.max(0, 1 - distanceFromCurrent * 3); // More gradual falloff
        
        // Calculate size based on proximity (smoother transition)
        const size = 6 + (proximity * 8);
        
        // Calculate opacity based on proximity
        const opacity = 0.5 + (proximity * 0.5);
        
        // Determine if this dot is the most active one
        const isExactlyActive = distanceFromCurrent < 0.04;
        const isNearlyActive = distanceFromCurrent < 0.1;
        
        return (
          <div
            key={index}
            className={`rounded-full transition-all duration-400 ease-out hover:bg-blue-500 cursor-pointer`}
            style={{
              width: size,
              height: size,
              backgroundColor: `rgba(37, 99, 235, ${proximity.toFixed(2)})`,
              transform: `scale(${1 + (proximity * 0.3)})`,
              boxShadow: isExactlyActive ?
                '0 0 12px rgba(37, 99, 235, 0.8)' :
                isNearlyActive ? 
                '0 0 8px rgba(37, 99, 235, 0.6)' : 
                proximity > 0.3 ? 
                '0 0 5px rgba(59, 130, 246, 0.4)' : 
                'none',
              zIndex: Math.round(proximity * 40) + 10,
              opacity: opacity,
              transition: 'all 400ms cubic-bezier(0.34, 1.16, 0.64, 1)',
            }}
            onClick={() => {
              if (onJumpToPosition && maxScroll > 0) {
                // Jump to the position represented by this dot
                onJumpToPosition(dotPosition * maxScroll);
              }
            }}
            aria-label={`Jump to position ${Math.round(dotPosition * 100)}%`}
            title={`Jump to position ${Math.round(dotPosition * 100)}%`}
          />
        );
      })}
    </div>
  );
};

export default TabsIndicator;

 