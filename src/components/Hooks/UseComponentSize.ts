import React, { useLayoutEffect, useState } from "react";

export const useComponentSize = (elm: React.RefObject<HTMLElement>): number[] => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      if (elm.current) {
        setSize([elm.current.clientWidth, elm.current.clientHeight]);
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
