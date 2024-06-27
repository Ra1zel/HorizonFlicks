"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const result = window.matchMedia(query);
  const [value, setValue] = useState(result.matches);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
