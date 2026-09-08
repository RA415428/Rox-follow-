declare global {
  interface Window {
    UnityAds: any;
  }
}

const GAME_ID = "500358206";
const REWARDED_PLACEMENT = "Rewarded_Android";

let isClickLocked = false;
let isCooldownActive = false;

export const initUnityAds = () => {
  if (typeof window !== "undefined" && window.UnityAds) {
    window.UnityAds.init(GAME_ID, false);
  }
};

export const showUnityRewardedAd = (onComplete?: () => void) => {
  if (isClickLocked || isCooldownActive) {
    console.log("Ad click ignored: Button is locked or in 10s cooldown");
    return;
  }

  isClickLocked = true;
  setTimeout(() => {
    isClickLocked = false;
  }, 3000);

  const adsterraElements = document.querySelectorAll(".adsterra-banner, [class*='adsterra'], [id*='adsterra']");
  adsterraElements.forEach((el) => ((el as HTMLElement).style.display = "none"));

  const startCooldown = () => {
    isCooldownActive = true;
    setTimeout(() => {
      isCooldownActive = false;
    }, 10000);
  };

  if (typeof window !== "undefined" && window.UnityAds && window.UnityAds.isReady && window.UnityAds.isReady(REWARDED_PLACEMENT)) {
    window.UnityAds.show(REWARDED_PLACEMENT, {
      onComplete: () => {
        adsterraElements.forEach((el) => ((el as HTMLElement).style.display = "block"));
        if (onComplete) onComplete();
        startCooldown();
      },
      onFailed: () => {
        adsterraElements.forEach((el) => ((el as HTMLElement).style.display = "block"));
        startCooldown();
      }
    });
  } else {
    adsterraElements.forEach((el) => ((el as HTMLElement).style.display = "block"));
    startCooldown();
  }
};
