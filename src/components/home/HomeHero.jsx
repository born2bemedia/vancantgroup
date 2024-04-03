import Link from "next/link";
import React from "react";

function HomeHero() {
  return (
    <section className="home-hero">
      <iframe
        src="https://my.spline.design/YbsmvAJ4EDVCvhZ4vURpYjaR/"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
      <div className="_container">
        <div className="home-hero__body">
          <h1>
            Have a crypto project?
            <br />
            We will boost your marketing!
          </h1>
          <h2>All-in-one performance tracking platform</h2>
          <div className="buttons">
            <Link href="#" className="main-button">
              Try now
            </Link>
            <Link href="#" className="secondary-button">
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
