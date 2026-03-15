export type ScrollContainer = Window | HTMLElement;

export interface SmoothScrollOptions {
  container?: ScrollContainer;
  duration?: number;
  maxDuration?: number;
  threshold?: number;
  stableFrames?: number;
  onDone?: () => void;
}
