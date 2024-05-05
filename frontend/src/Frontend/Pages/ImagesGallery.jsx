import React, { useEffect, useState } from "react";
import EditIcon from "../../Common/AdminEditIcon";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import {
  getImageGalleryFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import ModelBg from "../../Common/ModelBg";
import DynamicCarousel from "../Components/DynamicCarousel";
import { getImagePath } from "../../util/commonUtil";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { ImageGalleryStyled } from "../../Common/StyledComponents/Styled-ImageGallery";

const ImagesGallery = () => {
  const editComponentObj = {
    gallery: false,
  };

  const pageType = "imageGallery";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [imageGallery, setImageGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `imgGallery/clientImageVidoeGallery/${pageType}/`
        );

        if (response?.status === 200) {
          let key = Object.keys(response.data);
          setImageGallery(response.data[key]);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.gallery) {
      getGalleryImages();
    }
  }, [componentEdit.gallery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const findThumbHandler = (id) => {
    const findImg = imageGallery.find((allGallery) => allGallery.id === id);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageGalleryStyled>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("gallery", true)} />
            )}
            {componentEdit.gallery && (
              <div className="adminEditTestmonial">
                <AdminBanner
                  editHandler={editHandler}
                  componentType="gallery"
                  getImageListURL={`imgGallery/createImageVidoeGallery/${pageType}/`}
                  deleteImageURL="imgGallery/updateImageVidoeGallery/"
                  imagePostURL="imgGallery/createImageVidoeGallery/"
                  imageUpdateURL="imgGallery/updateImageVidoeGallery/"
                  imageLabel="Add Image"
                  showDescription={false}
                  showExtraFormFields={getImageGalleryFields("imageGallery")}
                  dimensions={imageDimensionsJson("imageGallery")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="row gallery">
        
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
    </ImageGalleryStyled>
  );
};
export default ImagesGallery;
