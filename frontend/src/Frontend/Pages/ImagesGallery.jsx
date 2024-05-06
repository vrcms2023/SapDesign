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
import ImageGalleryComponent from "../Components/ImageGalleryComponent";

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

        <ImageGalleryComponent pageType={pageType} componentEdit={componentEdit} />
      </div>
    </ImageGalleryStyled>
  );
};
export default ImagesGallery;
