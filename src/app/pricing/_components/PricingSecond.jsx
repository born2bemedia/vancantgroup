"use client";
import { RevealWrapper, RevealList } from "next-reveal";
import { useRef, useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

function PricingSecond() {
  const sectionRef = useRef(null);
  const blockRef = useRef(null);
  const [blockClass, setblockClass] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && blockRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const blockRect = blockRef.current.getBoundingClientRect();

        if (sectionRect.top >= 0) {
          setblockClass("");
        } else if (sectionRect.bottom <= window.innerHeight - 300) {
          setblockClass("is-absolute");
        } else if (
          sectionRect.top < 0 &&
          sectionRect.bottom > window.innerHeight - 300
        ) {
          setblockClass("is-fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pricing-second" ref={sectionRef}>
      <div className="_container">
        <h3>
          Each crypto project is unique. We understand that. That's why we can't
          offer fixed <br />
          prices. Instead, we fit our approach to match your project's needs
          precisely.
        </h3>
        <h2>How we form prices for crypto marketing</h2>
        <div className="pricing-second__body">
          <div className="pricing-second__col-01">
            <div className={`fixed-block ${blockClass}`} ref={blockRef}>
              <Spline scene="https://prod.spline.design/4LyeK5Yvi3fhB2P1/scene.splinecode" />
            </div>
          </div>
          <div className="pricing-second__col-02">
            <div className="column">
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Request</h3>
                    <p>
                      Once we receive a request, we quickly reach out for more
                      details.
                    </p>
                  </div>
                  <div>1</div>
                </div>
              </RevealWrapper>
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Project Analysis</h3>
                    <p>
                      We thoroughly analyse your project, examining its goals
                      and market potential.
                    </p>
                  </div>
                  <div>2</div>
                </div>
              </RevealWrapper>
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Competition Research</h3>
                    <p>
                      We study your competitors and market trends, finding both
                      opportunities and challenges.
                    </p>
                  </div>
                  <div>3</div>
                </div>
              </RevealWrapper>
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Budget Evaluation</h3>
                    <p>
                      We consider your project's budget and allocate resources
                      accordingly.
                    </p>
                  </div>
                  <div>4</div>
                </div>
              </RevealWrapper>
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Context Exploration</h3>
                    <p>
                      We consider your project's market position, reputation,
                      and context to devise effective strategies.
                    </p>
                  </div>
                  <div>5</div>
                </div>
              </RevealWrapper>
              <RevealWrapper origin="bottom" delay={100}>
                <div>
                  <div>
                    <h3>Price</h3>
                    <p>
                      Based on our analysis, we propose a price for our
                      marketing efforts tailored to your project's success.
                    </p>
                  </div>
                  <div>6</div>
                </div>
              </RevealWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSecond;