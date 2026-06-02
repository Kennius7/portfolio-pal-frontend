import { RefObject, useEffect, useRef } from "react";

type ClickOutsideEvent = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: (event: ClickOutsideEvent) => void,
): void {
  // Keep callback in a ref so changes to it never re-run the effect
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: ClickOutsideEvent) => {
      const target = event.target as Node;
      if (!ref.current || (ref.current as HTMLElement).contains(target)) return;
      callbackRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]); // stable: only re-runs if the ref object itself changes
}
