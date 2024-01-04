import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
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
