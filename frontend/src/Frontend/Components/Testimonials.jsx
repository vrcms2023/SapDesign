import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Title from "../../Common/Title";
import { getBaseURL } from "../../util/ulrUtil";
import { getImagePath } from "../../util/commonUtil";
import { sampleSize } from "lodash";

const Testimonials = ({ testimonis }) => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };

  const [admin, setAdmin] = useState(true);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
  };

  const [index, setIndex] = useState(0);
  const baseURL = getBaseURL();
  useEffect(() => {
    if (testimonis.length > 1) {
      const lastIndex = testimonis?.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }

      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index]);

  useEffect(() => {
    if (testimonis.length > 1) {
      let slider = setInterval(() => {
        setIndex(index + 1);
      }, 5000);
      return () => {
        clearInterval(slider);
      };
    }
  }, [index]);

  const ListOfTestimonials = testimonis?.map((item, indexPeople) => {
    const {
      testimonial_description,
      testimonial_sub_title,
      testimonial_title,
      path,
    } = item;
    let position = "nextSlide";
    if (indexPeople === index) {
      position = "activeSlide";
    }
    if (
      indexPeople === index - 1 ||
      (index === 0 && indexPeople === testimonis.length - 1)
    ) {
      position = "lastSlide";
    }
    return (
      <>
      <div className={`${position} article position-absolute testimonialComponent`} key={item.id}>
        
        {!item.path ? (
          <i className="fa fa-user" aria-hidden="true"></i>
        ) : (
          <img
            src={getImagePath(item.path)}
            className="rounded-circle testimonialImg shadow-lg border border-3 border-white"
            alt="User"
          />
        )}
        {/* <Title
          title={item.testimonial_title}
          cssClass="mb-2 fw-normal px-3 fs-2 fw-bold title"
        /> */}

        <p className="m-auto my-4 px-3 px-md-0 text-left" style={{
          fontSize: ".9rem"
        }}>
          {item.testimonial_description}
        </p>
        <Title
          title={`- ${item.testimonial_title}`}
          cssClass="mb-2 fw-medium fs-5 title"
        />
        <div className="d-flex justify-content-between align-items-center position-relative" style={{
          top: "-150px"
        }} >
          <Link to="" onClick={() => setIndex(index + 1)} className="previous" >
            {" "}
            {/* <img src={leftArrow} alt="Previous" width="42" height="42" /> */}
            <i className="fa fa-angle-left fs-1" aria-hidden="true"></i>
          </Link>
          <Link to="" onClick={() => setIndex(index - 1)} className="next">
            {" "}
            {/* <img src={rightArrow} alt="Next" width="42" height="42" /> */}
            <i className="fa fa-angle-right fs-1" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
      </>
    );
  });

  return <>{ListOfTestimonials}</>;
};

export default Testimonials;
