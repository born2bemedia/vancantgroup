"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/src/navigation";
import "@/public/scss/header.scss";
import Facebook from "./LayoutElements/socials/Facebook";
import Instagram from "./LayoutElements/socials/Instagram";
import Twitter from "./LayoutElements/socials/Twitter";
import LinkedIn from "./LayoutElements/socials/LinkedIn";

export default function Header({
  home,
  services,
  howItWorks,
  pricing,
  about,
  blog,
  faq,
  contact,
}) {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();
  const getLastSegment = (pathname) => {
    const segments = pathname.split("/");
    const lastSegment = segments.pop();

    // If the last segment is empty (which means the URL ends with '/blog'), pop another segment
    if (lastSegment === "" || lastSegment === "it" || lastSegment === "de") {
      return segments.join("/").replace("/it", "").replace("/de", "") || "/";
    }

    // Join the remaining segments excluding the language segment '/it' or '/de'
    return (
      segments.join("/").replace("/it", "").replace("/de", "") +
      "/" +
      lastSegment
    );
  };

  const lastSegment = getLastSegment(pathname);
  console.log(lastSegment);

  const menuOpen = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    setOpened(false);
  }, [pathname]);

  return (
    <>
      <header>
        <div className="_container">
          <div className="head-wrap">
            <Link href="/">
              <img alt="logo" src="/images/logo.svg" />
            </Link>
            <div className="header-actions">
              <div className="lang-switcher">
                <Link locale="en" href={lastSegment}>
                  <img src="/images/en.svg" />
                </Link>
                <Link locale="it" href={lastSegment}>
                  <img src="/images/it.svg" />
                </Link>
                <Link locale="de" href={lastSegment}>
                  <img src="/images/de.svg" />
                </Link>
              </div>
              <div className="socials">
                <Facebook />
                <Instagram />
                <Twitter />
                <LinkedIn />
              </div>
              <span onClick={() => menuOpen()} className="menu-btn">
                {!opened ? (
                  <img alt="logo" src="/images/burger.svg" />
                ) : (
                  <img alt="logo" src="/images/burger-close.svg" />
                )}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className={`menu-wrap ${opened ? "opened" : ""}`}>
        <div className="_container">
          <nav>
            <div className="left-col">
              <Link href="/">{home}</Link>
              <Link href="/services">{services}</Link>
              <Link href="/how-it-works">{howItWorks}</Link>
              <Link href="/pricing">{pricing}</Link>
            </div>
            <div className="right-col">
              <Link href="/about-us">{about}</Link>
              <Link href="/blog">{blog}</Link>
              <Link href="/faq">{faq}</Link>
              <Link href="/contact-us">{contact}</Link>
            </div>
          </nav>
          <div className="socials">
            <Facebook />
            <Instagram />
            <Twitter />
            <LinkedIn />
          </div>
        </div>
      </div>
    </>
  );
}
