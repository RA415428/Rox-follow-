import React, { useRef } from 'react';
import { showUnityRewardedAd } from '../utils/unityAds';

interface BottomNavBarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  [key: string]: any;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = (props) => {
  const navClickCount = useRef(0);

  const handleNavClick = (originalOnClick?: () => void) => {
    navClickCount.current += 1;
    if (navClickCount.current >= 4) {
      navClickCount.current = 0;
      showUnityRewardedAd();
    }
    if (originalOnClick) originalOnClick();
  };

  return (
    <div className="bottom-nav">
      {/* Navigation elements handle clicks safely */}
    </div>
  );
};

export default BottomNavBar;
