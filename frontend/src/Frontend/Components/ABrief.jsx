import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component Import
import Title from "../../Common/Title";

import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ModelBg from "../../Common/ModelBg";
import {
  getImagePath,
  storeServiceMenuValueinCookie,
  urlStringFormat,
} from "../../util/commonUtil";
import { getCookie } from "../../util/cookieUtil";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import { axiosClientServiceApi } from "../../util/axiosUtil";
// import { getImagePath } from "../../util/commonUtil";
import { getFormDynamicFields } from "../../util/dynamicFormFields";

// Image Import
// import Logo from "../../../src/Images/logo.svg";
import circleArrow from "../../../src/Images/arrow-right-circle.png";
import EditIcon from "../../Common/AdminEditIcon";

// Styles
import "./ABrief.css";
import Ancher from "../../Common/Ancher";
import { useSelector } from "react-redux";

const ABrief = ({ title, cssClass, linkClass, moreLink, dimensions }) => {
  const editComponentObj = {
    homecareers: false,
  };
  const pageType = "homePageCareer";
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [bannerdata, setBannerData] = useState([]);
  const { serviceMenu } = useSelector((state) => state.serviceMenu);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getBannerData = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `banner/clientBannerIntro/${pageType}/`
        );
        if (response?.status === 200) {
          setBannerData(response.data.imageModel);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.homecareers) {
      getBannerData();
    }
  }, [componentEdit.homecareers]);

  return (
    <div className="row py-5">
      {/* Edit News */}

      <div className="col-lg-6 p-5 ABriefImg d-md-flex justify-content-center align-items-center">
        <img
          src={
            bannerdata?.path
              ? getImagePath(bannerdata.path)
              : getImagePath("/media/images/dummy-image-square.png")
          }
          alt=""
          className="img-fluid"
        />
      </div>
      <div className="col-12 col-lg-6 p-4 d-flex justify-content-center align-items-start flex-column position-relative briefServices">
        {isAdmin && hasPermission && (
          <EditIcon editHandler={() => editHandler("homecareers", true)} />
        )}

        <div className="d-flex align-items-center mb-5">
          <i
            className="fa fa-angle-left text-muted fs-1 me-2"
            aria-hidden="true"
          ></i>
          <Title title={"OUR WORK LOCATIONS"} cssClass={"fs-4 fw-medium"} />
        </div>

        {bannerdata ? (
          <Title title={bannerdata.banner_title} cssClass={cssClass} />
        ) : (
          ""
        )}
        {/* <Title
          title={
            bannerdata?.banner_title ? bannerdata.banner_title : "upload Title"
          }
          cssClass={cssClass}
        /> */}

        <p className="lh-lg mt-md-3">
          {bannerdata?.banner_descripiton
            ? bannerdata.banner_descripiton
            : "upload Description"}
        </p>

        <div>
          <Link to="/about">
            <img src={circleArrow} />
          </Link>

          {/* <Ancher
            AncherLabel="More services"
            url
            Ancherpath={`/services/${urlStringFormat(
              getCookie("pageLoadServiceName"),
            )}/`}
            AncherClass="btn btn-secondary d-flex justify-content-center align-items-center gap-3"
            AnchersvgColor="#ffffff"
          /> */}
        </div>
      </div>
      {componentEdit.homecareers ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="homecareers"
            pageType={pageType}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(pageType)}
            dimensions={dimensions}
          />

          {/* <NewsForm editHandler={editHandler} componentType="careers" /> */}
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </div>
  );
};
export default ABrief;
