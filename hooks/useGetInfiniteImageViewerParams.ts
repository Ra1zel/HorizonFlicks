import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaquery";

const useGetScreenSize = () => {
  const matchSmMobile = useMediaQuery("(max-width: 375px)");
  const matchMobile = useMediaQuery("(max-width: 480px)");
  const matchTablet = useMediaQuery("(max-width: 768px)");
  const matchDesktop = useMediaQuery("(max-width: 1024px)");
  const matchDesktopLg = useMediaQuery("(max-width: 1440px)");
  const isLgScreenOrBigger = useMediaQuery("(min-width: 1440px)");

  return {
    isSmallMobileView: matchSmMobile,
    isMobileView: matchMobile,
    isTabletView: matchTablet,
    isDesktopView: matchDesktop,
    isLargeDesktopView: matchDesktopLg,
    isLgScreenOrBigger,
  };
};

export const useGetInfiniteImageViewParams = () => {
  const [itemsToDisplayPerRow, setItemsToDisplayPerRow] = useState<number>(2);
  const [itemSize, setItemSize] = useState<number>(400);

  const {
    isSmallMobileView,
    isMobileView,
    isTabletView,
    isDesktopView,
    isLargeDesktopView,
    isLgScreenOrBigger,
  } = useGetScreenSize();

  useEffect(() => {
    if (isSmallMobileView) {
      setItemsToDisplayPerRow(2);
      setItemSize(400);
    }
    if (isMobileView) {
      setItemsToDisplayPerRow(2);
      setItemSize(400);
    }
    if (isTabletView) {
      setItemsToDisplayPerRow(3);
      setItemSize(400);
    }
    if (isDesktopView) {
      setItemsToDisplayPerRow(3);
      setItemSize(400);
    }
    if (isLargeDesktopView) {
      setItemsToDisplayPerRow(4);
      setItemSize(400);
    }
    if (isLgScreenOrBigger) {
      setItemsToDisplayPerRow(6);
      setItemSize(410);
    }
  }, [
    isSmallMobileView,
    isMobileView,
    isTabletView,
    isDesktopView,
    isLargeDesktopView,
    isLgScreenOrBigger,
  ]);

  return {
    itemSize,
    itemsToDisplayPerRow,
  };
};
