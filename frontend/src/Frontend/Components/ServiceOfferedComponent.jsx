import React, { useEffect, useState } from "react";
import {
  getImagePath,
  getObjectPositionKey,
  sortByFieldName,
} from "../../util/commonUtil";
import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "./DynamicCarousel";
import { axiosClientServiceApi } from "../../util/axiosUtil";

const ServiceOfferedComponent = ({ getBannerAPIURL, componentEdit }) => {
  const [show, setShow] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const getServiceOfferedImages = async () => {
      try {
        const response = await axiosClientServiceApi.get(getBannerAPIURL);
        if (response?.status === 200) {
          let key = Object.keys(response.data);
          const _positionKey = getObjectPositionKey(response.data[key][0]);
          const _serviceList = sortByFieldName(
            response.data[key],
            _positionKey
          );
          setImageGallery(_serviceList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };

    if (!componentEdit.serviceOffered) {
      getServiceOfferedImages();
    }
  }, [componentEdit.serviceOffered]);

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
      <div className="row serviceOffered">
        <div className="col-md-10 offset-md-1">
          <div className="container">

            <div className="text-center my-5">
              <sapn className="fs-1">View Gallery</sapn>
            </div>

            <div className="row">
              {imageGallery.length > 0 &&
                imageGallery?.map((item, index) => (
                  <div className="col-4 mb-4" key={item.id}>
                    <img
                      src={getImagePath(item.path)}
                      alt={item.alternitivetext}
                      className="d-block w-100 img-fluid"
                      onClick={() => findThumbHandler(item.id)}
                    />
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

export default ServiceOfferedComponent;
