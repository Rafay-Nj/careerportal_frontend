import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/mP-logo.png";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
function Header() {

  const hasWindow = typeof window !== "undefined";
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    };
  }

  React.useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return (
    <>
      {windowDimensions.width >= 850 ? (
        <>
          <div className={"header"}>
            <div className="header__content">
              <div className="header__left">
                <a
                  target="_blank"
                  href={"https://mulphico.pk"}
                  rel="noreferrer"
                >
                  <img
                    className={"header__logo"}
                    src={logo}
                    alt="logo"
                  />
                </a>
              </div>
              <div className="header__right">
                <div className="header__navigation">
                  <div className="navigation__item">
                    <div className="navigation__item__text">
                      {/* <a
                        target="_blank"
                        href={"https://lca.mulphico.pk/"}
                        rel="noreferrer"
                      >
                        <span className="navigation__item__text__border">
                          Home
                        </span>
                      </a> */}
                    </div>
                  </div>

                  <div
                    className="navigation__item"

                  >
                    <div className="navigation__item__text">
                      {/* <a
                        target="_blank"
                        href={"https://lca.mulphico.pk/about-us/"}
                        rel="noreferrer">
                        <span className="navigation__item__text__border">
                          About Us
                        </span>
                      </a> */}
                    </div>

                  </div>

                  <div
                    className="navigation__item"

                  >
                    <div className="navigation__item__text">
                      {/* <a
                        target="_blank"
                        href={"https://lca.mulphico.pk/updates/"}
                        rel="noreferrer"
                      >
                        <span className="navigation__item__text__border">
                          Updates
                        </span>
                      </a> */}
                    </div>

                  </div>
                  <div
                    className="navigation__item"

                  >
                    <div className="navigation__item__text">
                      {/* <a
                        target="_blank"
                        href="https://lca.mulphico.pk/gallery/"
                        rel="noreferrer"
                      >
                        <span className="navigation__item__text__border">
                          Gallery
                        </span>
                      </a> */}
                    </div>

                  </div>
                  <div className="navigation__item">
                    <div className="navigation__item__text__last">
                      {/* <a
                        target="_blank"
                        href="https://lca.mulphico.pk/contact-us/"
                        rel="noreferrer">
                        <span className="navigation__item__text__border">
                          Contact Us
                        </span>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="header__right">

<div className="header__navigation">
  <div className="navigation__item">
    <div className="navigation__item__text">
      <a
        target="_blank"
        href={"https://lca.mulphico.pk/"}
        rel="noreferrer"
      >
        <span className="navigation__item__text__border">
          Home
        </span>
      </a>
    </div>
  </div>

  <div
    className="navigation__item"

  >
    <div className="navigation__item__text">
      <a
        target="_blank"
        href={"https://lca.mulphico.pk/about-us/"}
        rel="noreferrer">
        <span className="navigation__item__text__border">
          About Us
        </span>
      </a>
    </div>

  </div>

  <div
    className="navigation__item"

  >
    <div className="navigation__item__text">
      <a
        target="_blank"
        href={"https://lca.mulphico.pk/updates/"}
        rel="noreferrer"
      >
        <span className="navigation__item__text__border">
          Updates
        </span>
      </a>
    </div>

  </div>
  <div
    className="navigation__item"

  >
    <div className="navigation__item__text">
      <a
        target="_blank"
        href="https://lca.mulphico.pk/gallery/"
        rel="noreferrer"
      >
        <span className="navigation__item__text__border">
          Gallery
        </span>
      </a>
    </div>

  </div>
  <div className="navigation__item">
    <div className="navigation__item__text__last">
      <a
        target="_blank"
        href="https://lca.mulphico.pk/contact-us/" 
        rel="noreferrer">
        <span className="navigation__item__text__border">
          Contact Us
        </span>
      </a>
    </div>
  </div>
</div>
</div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <MobileNavBar />
        </>
      )}
    </>
  );
}

export default Header;
