import React, { useState } from "react";
import "./Slider.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ currDepartment, setCurrDepartment }) => {
  let Dp = [
    "All",
    "Administration",
    "Consumer",
    "Finance & Accounts",
    "Health Care",
    "Human Resources",
    "Information Technology",
    "Internal Audit",
    "Logistics",
    "Mobile Financial Services",
    // "Management",
    "Pharma Sales",
    "Telecom & Allied Business",
  ];
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    windowDimensions.width >= 750
      ? (slider.scrollLeft = slider.scrollLeft - 400)
      : (slider.scrollLeft = slider.scrollLeft - 200);
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    windowDimensions.width >= 750
      ? (slider.scrollLeft = slider.scrollLeft + 400)
      : (slider.scrollLeft = slider.scrollLeft + 200);
  };
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
    <div className="Slider">
      <div className="Slider__department__tab__section">
        {windowDimensions.width >= 750 ? (
          <div className="Slider__btn">
            <MdChevronLeft className="Slider__btn__icon" onClick={slideLeft} />
          </div>
        ) : null}

        <div id="slider" className="Slider__department__tabs ">
          {Dp.map((items, ind) => (
            <>
              {items === currDepartment ? (
                <div
                  key={ind}
                  className="Slider__department__tab__active"
                  onClick={() => setCurrDepartment("All")}
                >
                   {items}
                </div>
              ) : (
                <div
                  key={ind}
                  className="Slider__department__tab"
                  onClick={() => setCurrDepartment(items)}
                >
                   {items}
                </div>
              )}
            </>
          ))}
        </div>
        {windowDimensions.width >= 750 ? (
          <div className="Slider__btn">
            <MdChevronRight
              className="Slider__btn__icon"
              onClick={slideRight}
            />
          </div>
        ) : null}
      </div>
      <div className="Slider__btn__box">
        {windowDimensions.width <= 750 ? (
          <div className="Slider__btn">
            <MdChevronLeft className="Slider__btn__icon" onClick={slideLeft} />
          </div>
        ) : null}
        {windowDimensions.width <= 750 ? (
          <div className="Slider__btn">
            <MdChevronRight
              className="Slider__btn__icon"
              onClick={slideRight}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Slider;
