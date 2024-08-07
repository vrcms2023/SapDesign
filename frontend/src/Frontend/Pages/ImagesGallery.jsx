import React, { useEffect, useState } from "react";

// Componnts
import EditIcon from "../../Common/AdminEditIcon";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { ImageGalleryStyled } from "../../Common/StyledComponents/Styled-ImageGallery";
import ImageGalleryComponent from "../Components/ImageGalleryComponent";
import CustomPagination from "../../Common/CustomPagination";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import {
  getImageGalleryFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import {
  getObjectPositionKey,
  paginationDataFormat,
  sortByFieldName,
} from "../../util/commonUtil";
import { axiosClientServiceApi } from "../../util/axiosUtil";

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
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLoadResult, setPageloadResults] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getGalleryImages = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `imgGallery/clientImageVidoeGallery/${pageType}/`
        );

        if (response?.status === 200) {
          setResponseData(response?.data);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.gallery) {
      getGalleryImages();
    }
  }, [componentEdit.gallery]);

  const findThumbHandler = (id) => {
    const findImg = imageGallery.find((allGallery) => allGallery.id === id);
    setShowModal(!showModal);
    setImg(findImg);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };
  const setResponseData = (data) => {
    const _positionKey = getObjectPositionKey(data.results[0]);
    const _newslList = sortByFieldName(data.results, _positionKey);
    setImageGallery(_newslList);
    setPaginationData(paginationDataFormat(data));
    setCurrentPage(1);
  };

  return (
    <>
      <ImageGalleryStyled>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isAdmin && hasPermission && (
                <EditIcon editHandler={() => editHandler("gallery", true)} />
              )}
              {componentEdit.gallery && (
                <div className="adminEditTestmonial">
                  <AdminBanner
                    editHandler={editHandler}
                    componentType="gallery"
                    getImageListURL={`imgGallery/getAllClientImageVidoeGallery/${pageType}/`}
                    deleteImageURL="imgGallery/updateImageVidoeGallery/"
                    imagePostURL="imgGallery/createImageVidoeGallery/"
                    imageUpdateURL="imgGallery/updateImageVidoeGallery/"
                    imageIndexURL="imgGallery/updateNewsIndex/"
                    imageLabel="Add Image"
                    showDescription={false}
                    showExtraFormFields={getImageGalleryFields("imageGallery")}
                    dimensions={imageDimensionsJson("imageGallery")}
                  />
                </div>
              )}
            </div>
          </div>

          <ImageGalleryComponent
            pageType={pageType}
            componentEdit={componentEdit}
            imageGallery={imageGallery}
          />
        </div>
      </ImageGalleryStyled>

      {/* Pagination */}

      <div className="container">
        <div className="row my-5">
          {paginationData?.total_count && (
            <CustomPagination
              paginationData={paginationData}
              paginationURL={
                isAdmin
                  ? `imgGallery/createImageVidoeGallery/${pageType}/`
                  : `imgGallery/clientImageVidoeGallery/${pageType}/`
              }
              paginationSearchURL={
                isAdmin
                  ? `imgGallery/createImageVidoeGallery/${pageType}/`
                  : `imgGallery/clientImageVidoeGallery/${pageType}/`
              }
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setResponseData={setResponseData}
              pageLoadResult={pageLoadResult}
            />
          )}
        </div>
      </div>
      
    </>
  );
};
export default ImagesGallery;
