export default function OrganicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Light mode SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full dark:hidden"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: '120%', minHeight: '120%', left: '-10%', top: '-10%' }}
      >
        <defs>
          <linearGradient id="organicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DA070" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8DA070" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#8DA070" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M-100,-100 Q200,100 400,150 T800,200 Q1000,180 1300,100 L1300,900 L-100,900 Z"
          fill="url(#organicGradient)"
          className="animate-float"
        />
        <path
          d="M-100,100 Q300,250 600,300 T1300,350 L1300,900 L-100,900 Z"
          fill="url(#organicGradient)"
          fillOpacity="0.1"
          className="animate-float-delayed"
        />
      </svg>
      
      {/* Dark mode SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full hidden dark:block"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: '120%', minHeight: '120%', left: '-10%', top: '-10%' }}
      >
        <defs>
          <linearGradient id="organicGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B9BD5" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#5B9BD5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#5B9BD5" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="organicGradientDark2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5B9BD5" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#5B9BD5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5B9BD5" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="organicGradientDark3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#5B9BD5" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#5B9BD5" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#5B9BD5" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Main organic shape */}
        <path
          d="M-100,-100 Q200,100 400,150 T800,200 Q1000,180 1300,100 L1300,900 L-100,900 Z"
          fill="url(#organicGradientDark)"
          className="animate-float"
        />
        {/* Secondary shape */}
        <path
          d="M-100,100 Q300,250 600,300 T1300,350 L1300,900 L-100,900 Z"
          fill="url(#organicGradientDark2)"
          fillOpacity="0.1"
          className="animate-float-delayed"
        />
        {/* Third layer for depth */}
        <path
          d="M-50,200 Q250,350 500,400 T1200,450 Q1400,420 1500,300 L1500,1000 L-50,1000 Z"
          fill="url(#organicGradientDark3)"
          fillOpacity="0.08"
          className="animate-float-slow"
        />
        {/* Wave-like shape */}
        <path
          d="M0,0 Q400,150 800,100 T1600,50 L1600,850 L0,850 Z"
          fill="url(#organicGradientDark)"
          fillOpacity="0.06"
          className="animate-float-wave"
        />
      </svg>
    </div>
  );
}

