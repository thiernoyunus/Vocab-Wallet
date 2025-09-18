export function triggerHaptic(pattern: number | number[] = 20) {
  if (typeof window === "undefined") {
    return;
  }

  const navigatorWithVibration = window.navigator as Navigator & {
    vibrate?: (pattern: number | number[]) => boolean;
  };

  try {
    navigatorWithVibration.vibrate?.(pattern);
  } catch (error) {
    console.error("Haptic feedback failed", error);
  }
}
