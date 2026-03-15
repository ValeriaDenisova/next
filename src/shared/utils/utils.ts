import type { Option } from "@components/MultiDropdown/MultiDropdown";
import type { SmoothScrollOptions } from "./types";

export const getPages = (numberStarlings: number, active: number) => {
  const pages = [];
  if (numberStarlings <= 5) {
    for (let i = 1; i <= numberStarlings; i++) {
      pages.push(i);
    }
    return pages;
  }
  if (active === 1) {
    pages.push(1, 2, 3, "...", numberStarlings);
    return pages;
  }
  if (active === 2) {
    pages.push(1, 2, 3, "...", numberStarlings);
    return pages;
  }
  if (active === numberStarlings) {
    pages.push(1, "...", numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  if (active === numberStarlings - 1) {
    pages.push(1, "...", numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  pages.push(1, "...", active - 1, active, active + 1, "...", numberStarlings);
  return pages;
};

export const nullFunction = () => null;

export const handleTitle = (category: Option[]) => {
  if (category.length == 0) {
    return "Categories";
  }
  return category.reduce((acc, item) => {
    return acc + (acc !== "" ? ", " : "") + item.value;
  }, "");
};

export function smoothScrollTo(targetTop: number, opts: SmoothScrollOptions = {}) {
  const { container = window, duration = 450, maxDuration = 2500, onDone } = opts;

  const isWindow = container === window;
  const el = isWindow ? document.documentElement || document.body : (container as HTMLElement);

  const getScroll = () =>
    isWindow
      ? window.scrollY || (document.documentElement && document.documentElement.scrollTop) || 0
      : (el as HTMLElement).scrollTop;

  const setScroll = (v: number) => {
    if (isWindow) {
      window.scrollTo({ top: v, behavior: "auto" });
    } else {
      (el as HTMLElement).scrollTop = v;
    }
  };

  const startScroll = getScroll();
  const distance = targetTop - startScroll;

  let rafId = 0;
  let startTime: number | null = null;
  let cancelled = false;

  const onUserScroll = () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
    removeListeners();
  };

  const addListeners = () => {
    if (container === window) {
      window.addEventListener("wheel", onUserScroll, { passive: true });
    } else {
      (container as HTMLElement).addEventListener("wheel", onUserScroll, { passive: true });
    }
    window.addEventListener("touchstart", onUserScroll, { passive: true });
    window.addEventListener("keydown", onUserScroll, { passive: true });
  };

  const removeListeners = () => {
    if (container === window) {
      window.removeEventListener("wheel", onUserScroll);
    } else {
      (container as HTMLElement).removeEventListener("wheel", onUserScroll);
    }
    window.removeEventListener("touchstart", onUserScroll);
    window.removeEventListener("keydown", onUserScroll);
  };

  addListeners();

  const step = (now: number) => {
    if (startTime == null) startTime = now;
    const t = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = startScroll + distance * eased;

    setScroll(value);

    const nearEnd = Math.abs(targetTop - value) < 0.5;
    const elapsed = now - (startTime ?? now);

    if (nearEnd || t >= 1 || elapsed >= maxDuration || cancelled) {
      setScroll(targetTop);
      removeListeners();
      onDone?.();
      return;
    }

    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);
}

export async function resolveParamsId(params: unknown): Promise<string> {
  if (params) {
    const resolved = await (params as Promise<{ id: string }>);
    return resolved?.id ?? "";
  }
  const idRaw = (params as { id?: string }).id;
  if (Array.isArray(idRaw)) {
    return idRaw[0] ?? "";
  }
  return idRaw ?? "";
}

export function dinnerNumber(total: number): number | null {
  if (total <= 0) return null;
  return Math.floor(Math.random() * total);
}

export function capitalizeFirstLetter(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
