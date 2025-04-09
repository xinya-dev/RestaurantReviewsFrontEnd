import React from 'react';

interface TabsIndicatorProps {
  scrollPosition: number;
  maxScroll: number;
  totalDots?: number;
}

const TabsIndicator: React.FC<TabsIndicatorProps> = ({
  scrollPosition,
  maxScroll,
  totalDots = 5
}) => {
  // Calculate scroll progress (0 to 1)
  const progress = Math.min(scrollPosition / maxScroll, 1);
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-3 mb-2 py-2 relative">
      {/* Track bar - wider and more visible */}
      <div className="absolute h-1.5 w-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      
      {/* Progress background fill with gradient effect */}
      <div 
        className="absolute h-1.5 left-1/2 bg-gradient-to-r from-blue-500/40 to-blue-600/20 dark:from-blue-500/30 dark:to-blue-400/10 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.max(0, progress * 64)}px`,
          transform: 'translateX(-100%)',
        }}
      ></div>
      
      {/* Moving indicator - enhanced with better glow effect */}
      <div 
        className="absolute h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out"
        style={{
          width: `${Math.max(16, 64 * (1/totalDots))}px`,
          left: `calc(50% - 32px + ${progress * 64}px)`,
          transform: `translateX(-${progress * 100}%)`,
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.7)'
        }}
      ></div>
      
      {/* Dots with improved visual feedback */}
      {Array.from({ length: totalDots }).map((_, index) => {
        // Calculate how close each dot is to being active based on scroll position
        const dotPosition = index / (totalDots - 1);
        const distanceFromCurrent = Math.abs(dotPosition - progress);
        const isActive = distanceFromCurrent < 0.15;
        const isVeryClose = distanceFromCurrent < 0.08;
        const isExactlyActive = distanceFromCurrent < 0.04;
        
        // Pulse animation for the most active dot
        const pulseAnimation = isExactlyActive ? 
          'animate-[pulse_2s_ease-in-out_infinite]' : '';
        
        return (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ease-out ${pulseAnimation} ${
              isActive ? 'hover:bg-blue-500 cursor-pointer' : 'hover:bg-gray-400 cursor-pointer'
            }`}
            style={{
              width: isExactlyActive ? 14 : isVeryClose ? 12 : isActive ? 9 : 7,
              height: isExactlyActive ? 14 : isVeryClose ? 12 : isActive ? 9 : 7,
              backgroundColor: isExactlyActive ? 
                'rgb(37, 99, 235)' : 
                isVeryClose ? 
                'rgba(37, 99, 235, 0.9)' : 
                isActive ? 
                'rgba(59, 130, 246, 0.8)' : 
                'rgba(209, 213, 219, 0.8)',
              transform: `scale(${isExactlyActive ? 1.3 : isVeryClose ? 1.2 : isActive ? 1.1 : 1})`,
              boxShadow: isExactlyActive ?
                '0 0 10px rgba(37, 99, 235, 0.75)' :
                isVeryClose ? 
                '0 0 8px rgba(37, 99, 235, 0.6)' : 
                isActive ? 
                '0 0 5px rgba(59, 130, 246, 0.4)' : 
                'none',
              zIndex: isExactlyActive ? 40 : isVeryClose ? 30 : isActive ? 20 : 10,
              opacity: isExactlyActive ? 1 : isVeryClose ? 0.95 : isActive ? 0.9 : 0.7,
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        );
      })}
    </div>
  );
};

export default TabsIndicator;

 