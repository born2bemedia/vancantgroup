"use client";
import React, { Suspense, lazy, useState, useEffect } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

function AnimationElement({ animation, fallbackImage, mobileHidden }) {
  const [isAndroidMobile, setIsAndroidMobile] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(
   false
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        setIsAndroidMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    setIsMobileWidth(window.innerWidth < 767);
    function handleResize() {
      setIsMobileWidth(window.innerWidth < 767);
    }
    
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobileWidth) {
    if (mobileHidden) {
      return <></>;
    } else {
      return <img src={fallbackImage} alt="Fallback" className="animation" />;
    }
  } else {
    return (
      <Suspense fallback={<div>...</div>}>
        <Spline className="animation" scene={animation} />
      </Suspense>
    );
  }
}

export default AnimationElement;
