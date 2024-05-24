import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";

import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "./DynamicCarousel";
import Title from "../../Common/Title";

const ImageGalleryComponent = ({ pageType, componentEdit, imageGallery }) => {
  const [show, setShow] = useState(false);
  //const [imageGallery, setImageGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);


  const findThumbHandler = (id) => {
    const findImg = imageGallery.find((allGallery) => allGallery.id === id);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="row gallery">
        <div className="col-md-10 offset-md-1">
          <div className="container">
            <div className="my-5 ">
              <Title title="View Gallery" cssClass="fs-1 fw-medium px-4 py-2 text-black text-center" />
              <span className="w-50 d-block m-auto"
                style={{ borderBottom: "1px solid #444444" }}
              >
              </span>
            </div>
           

            <div className="row">
              {imageGallery?.length > 0 &&
                imageGallery?.map((item, index) => (
                  <div className="col-sm-6 col-md-4 mb-4" key={item.id}>
                    <img
                      src={getImagePath(item.path)}
                      alt={item.alternitivetext}
                      className="d-block w-100 img-fluid"
                      onClick={() => findThumbHandler(item.id)}
                    />

                    {/* <div className="carousel-caption ">
              {item.image_title && (
                <h1 className="fw-bold">{item.image_title}</h1>
              )}

              {item.image_description && (
                <p className="fw-normal description fs-5">
                  {item.image_description}
                </p>
              )}
            </div> */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {show && <ModelBg />}
      {showModal && (
        <DynamicCarousel
          obj={img}
          all={imageGallery}
          closeCarousel={closeModel}
        />
      )}
      {showModal && <ModelBg closeModel={closeModel} />}
    </div>
  );
};

export default ImageGalleryComponent;
