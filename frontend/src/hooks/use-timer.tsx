import { useEffect, useRef } from "react";

const useTimer = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const start = (callback: () => void, delay: number) => {
    timer.current = setTimeout(callback, delay);
  };

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { start, stop };
};

export default useTimer;
