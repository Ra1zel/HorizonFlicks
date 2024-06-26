import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaquery";

const useGetScreenSize = () => {
  const matchSmMobile = useMediaQuery(
    "(min-width: 0px) and (max-width: 599px)",
  );
  const matchMobile = useMediaQuery(
    "(min-width: 600px) and (max-width: 899px)",
  );
  const matchTablet = useMediaQuery(
    "(min-width: 900px) and (max-width: 1099px) ",
  );
  const matchDesktop = useMediaQuery(
    "(min-width: 1100px) and (max-width: 1374px)",
  );
  const matchDesktopLg = useMediaQuery(
    "(min-width: 1375px) and (max-width: 1560px)",
  );

  const isLgScreenOrBigger = useMediaQuery("(min-width: 1561px)");

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
      setItemsToDisplayPerRow(1);
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
      setItemsToDisplayPerRow(4);
      setItemSize(400);
    }
    if (isLargeDesktopView) {
      setItemsToDisplayPerRow(5);
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
