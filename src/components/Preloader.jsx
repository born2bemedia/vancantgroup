"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Preloader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      // After the loading is done, start the fade-out effect
      setTimeout(() => setIsVisible(false), 200); // Adjust the timeout to control the speed of the fade-out
    }, 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        color:"#ffffff",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0F0F0F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        opacity: isLoading ? 1 : 0,
        transition: "opacity 0.5s ease", // Smoothly transition the opacity
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <span>Loading...</span>
    </div>
  );
};

export default Preloader;
