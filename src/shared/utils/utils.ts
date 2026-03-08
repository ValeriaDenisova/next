import type { Option } from '@components/MultiDropdown/MultiDropdown';
import type { SmoothScrollOptions } from './types';

export const getPages = (numberStarlings: number, active: number) => {
  const pages = [];
  if (numberStarlings <= 5) {
    for (let i = 1; i <= numberStarlings; i++) {
      pages.push(i);
    }
    return pages;
  }
  if (active === 1) {
    pages.push(1, 2, 3, '...', numberStarlings);
    return pages;
  }
  if (active === 2) {
    pages.push(1, 2, 3, '...', numberStarlings);
    return pages;
  }
  if (active === numberStarlings) {
    pages.push(1, '...', numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  if (active === numberStarlings - 1) {
    pages.push(1, '...', numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  pages.push(1, '...', active - 1, active, active + 1, '...', numberStarlings);
  return pages;
};

export const nullFunction = () => null;

export const handleTitle = (category: Option[]) => {
  if (category.length == 0) {
    return 'Categories';
  }
  return category.reduce((acc, item) => {
    return acc + (acc !== '' ? ', ' : '') + item.value;
  }, '');
};

export function smoothScrollTo(targetTop: number, opts: SmoothScrollOptions = {}) {
  const {
    container = window,
    duration = 400,
    maxDuration = 2000,
    threshold = 0.6,
    stableFrames = 4,
    onDone,
  } = opts;

  const isWindow = container === window;
  const el = isWindow ? document.documentElement || document.body : (container as HTMLElement);

  const getScroll = () =>
    isWindow
      ? window.scrollY || document.documentElement.scrollTop || 0
      : (el as HTMLElement).scrollTop;
  const setScroll = (v: number) => {
    if (isWindow) {
      window.scrollTo({ top: v, behavior: 'auto' });
    } else {
      (el as HTMLElement).scrollTop = v;
    }
  };
  const getScrollHeight = () =>
    isWindow
      ? document.documentElement.scrollHeight || document.body.scrollHeight
      : (el as HTMLElement).scrollHeight;

  let ro: ResizeObserver | null = null;
  let resizedFlag = false;
  try {
    ro = new ResizeObserver(() => {
      resizedFlag = true;
    });
    ro.observe(isWindow ? document.documentElement || document.body : (el as HTMLElement));
  } catch {
    ro = null;
  }

  const startTime = performance.now();
  let lastTime = startTime;
  let stableCount = 0;
  let lastHeight = getScrollHeight();

  function step(now: number) {
    const dt = Math.max(1, now - lastTime);
    lastTime = now;

    const current = getScroll();
    const remaining = targetTop - current;

    const alpha = 1 - Math.pow(0.001, dt / Math.max(16, duration));
    const next = current + remaining * alpha;

    setScroll(next);

    const curHeight = getScrollHeight();
    const heightChanged = Math.abs(curHeight - lastHeight) > 1;
    if (heightChanged || resizedFlag) {
      stableCount = 0;
      resizedFlag = false;
      lastHeight = curHeight;
    } else {
      if (Math.abs(targetTop - next) <= threshold) {
        stableCount++;
      } else {
        stableCount = 0;
      }
    }

    const elapsed = now - startTime;
    const doneByPos = Math.abs(targetTop - next) <= threshold;
    const doneByStable = stableCount >= stableFrames;
    const doneByTimeout = elapsed >= maxDuration;

    if ((doneByPos && doneByStable) || doneByTimeout) {
      setScroll(targetTop);
      ro?.disconnect();
      onDone?.();
      return;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}


export async function resolveParamsId(params: any): Promise<string> {
  if (params && typeof (params as any).then === 'function') {
    const resolved = await (params as Promise<{ id: string }>);
    return resolved?.id ?? '';
  }
  const idRaw = (params as { id?: any }).id;
  if (Array.isArray(idRaw)) {
    return idRaw[0] ?? '';
  }
  return idRaw ?? '';
}