import React, { useEffect, useState } from "react";

// Components
import Ancher from "../../../Common/Ancher";
import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntroAdmin from "../../../Admin/Components/BriefIntro/";

import EditIcon from "../../../Common/AdminEditIcon";
import ABrief from "../../Components/ABrief";
import ABriefAbout from "../../Components/ABriefAbout";
import HomeNews from "../../Components/HomeNews";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getCarouselFields,
  getFormDynamicFields,
  getTestimonialsFields,
  getserviceOfferedFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import ImagesGallery from "../ImagesGallery";

import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
// Styles

import "./Home.css";
import Features from "../../Components/Features";
import { ImageGalleryStyled } from "../../../Common/StyledComponents/Styled-ImageGallery";
import { Link } from "react-router-dom";
import Banner from "../../../Common/Banner";
import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";

import ImageGalleryComponent from "../../Components/ImageGalleryComponent";
import ServiceOfferedComponent from "../../Components/ServiceOfferedComponent";

import { ClientListComponent } from "../../Components/ClientListComponent";
import { sortCreatedDateByDesc } from "../../../util/dataFormatUtil";
import HomeClients from "../../Components/HomeClients";
import { HomeClientsStyled } from "../../../Common/StyledComponents/Styled-HomeClients";
import { sortByFieldName } from "../../../util/commonUtil";

const Home = () => {
  const editComponentObj = {
    banner: false,
    // carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
    serviceOffered: false,
  };

  const pageType = "home";
  const serviceOffered = "serviceOffered";
  const [testimonis, setTestmonis] = useState([]);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);
  const [clientsList, setClientsList] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`
        );
        if (response?.status === 200) {
          const _testimonialsList = sortByFieldName(
            response.data.results,
            "testimonial_position"
          );
          setTestmonis(_testimonialsList);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.testmonial) {
      getTestimonial();
    }
  }, [componentEdit.testmonial]);

  useEffect(() => {
    const getClientList = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/client/getAllClientLogos/`
        );
        if (response?.status === 200) {
          const _clientList = sortByFieldName(
            response.data.results,
            "client_position"
          );

          setClientsList(_clientList);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getClientList();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0 position-relative homePage">
            {isAdmin && hasPermission && (
              <EditIcon editHandler={() => editHandler("banner", true)} />
            )}
            <Banner
              getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
              bannerState={componentEdit.banner}
            />
          </div>
        </div>
        {componentEdit.banner ? (
          <div className="adminEditTestmonial">
            <ImageInputsForm
              editHandler={editHandler}
              componentType="banner"
              pageType={`${pageType}-banner`}
              imageLabel="Banner Image"
              showDescription={false}
              showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
              dimensions={imageDimensionsJson("banner")}
            />
          </div>
        ) : (
          ""
        )}

       

        {/* Carousel */}
        {/* <div className="row">
          <div className="col-md-12 p-0 carousel">
            {isAdmin && hasPermission && <EditIcon editHandler={editHandler} />}
            <Carousel carouselState={componentEdit.carousel} />
          </div>
        </div> */}

        {/* {componentEdit.carousel && (
          <div className="adminEditTestmonial">
            <AdminBanner
              editHandler={editHandler}
              componentType="carousel"
              getImageListURL="carousel/createCarousel/"
              deleteImageURL="carousel/updateCarousel/"
              imagePostURL="carousel/createCarousel/"
              imageUpdateURL="carousel/updateCarousel/"
              imageIndexURL="carousel/updateCarouselindex/"
              imageLabel="Add Carousel Image"
              showDescription={false}
              showExtraFormFields={getCarouselFields("carousel")}
              dimensions={imageDimensionsJson("carousel")}
            />
          </div>
        )} */}


        {/*  HOME Services */}
        <div className="row" style={{ background: "#f3f3f3" }}>
          <div className="col-md-8 offset-md-2">
            <div className="container">
              <div className="row">
                <div className="col-md-12 ABrief">
                  <ABrief
                    cssClass="title"
                    dimensions={imageDimensionsJson("homeCareers")}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Service Offered */}
      <h1>Service Offered</h1>
      {/* <ImageGalleryComponent pageType={"imageGallery"} /> */}
      {/* <ServiceOfferedComponent pageType={"serviceOffered"} /> */}
      <div className="text-center mb-5" style={{marginTop: "100px"}}>
            <span className="fs-1 px-4 py-2" style={{borderBottom: "1px solid #444444"}}>Services Offered</span>
          </div>
      <div className="row">
        <div className="col-md-12 p-0 carousel">
          {isAdmin && hasPermission && (
            <EditIcon editHandler={() => editHandler("serviceOffered", true)} />
          )}

          {/* <Carousel carouselState={componentEdit.serviceOffered} /> */}
          <ServiceOfferedComponent
            getBannerAPIURL={`carousel/clientCarouselbyCategory/${serviceOffered}/`}
            componentEdit={componentEdit}
          />

        </div>
      </div>


      {componentEdit.serviceOffered && (
        <div className="adminEditTestmonial">
          <AdminBanner
            editHandler={editHandler}
            componentType="serviceOffered"
            getImageListURL={`carousel/getCarousel/${serviceOffered}/`}
            deleteImageURL="carousel/updateCarousel/"
            imagePostURL="carousel/createCarousel/"
            imageUpdateURL="carousel/updateCarousel/"
            imageIndexURL="carousel/updateCarouselindex/"
            imageLabel="Add Service Offered"
            showDescription={false}
            showExtraFormFields={getserviceOfferedFields(serviceOffered)}
            dimensions={imageDimensionsJson("carousel")}
          />
        </div>
      )}


      {/* Service Offered */}
      {/* <h1>Service Offered</h1> */}


      {/* Image Gallery Carousel */}

      <ImageGalleryStyled>
        <div className="text-center mb-5" style={{marginTop: "100px"}}>
            <span className="fs-1 px-4 py-2" style={{borderBottom: "1px solid #444444"}}>View Gallery</span>
          </div>
        <div className="row ">
          <div className="col-md-10 offset-md-1 homeGalleryCarousel">
            <div className="container">
              <div className="row">
                <div className="col-md-10 offset-md-1">
                  <Carousel carouselState={componentEdit.carousel} />

                </div>
                
              </div>
              
            </div>
          </div>

        </div>
        <div className="text-center py-4 position-relative viewAllBtn">
                <Link to="/imageGallery" className="btn btn-outline">View All</Link>
              </div> 
      </ImageGalleryStyled>

 
      <HomeClientsStyled>

       <div className="text-center mb-5" style={{marginTop: "100px"}}>
        <span className="fs-1 px-4 py-2" style={{borderBottom: "1px solid #444444"}}>Clients</span>
      </div>
 
            {clientsList.map((client) => {
              return <HomeClients client={client} key={client.id} />;
            })}
          </div>
        </div>
      </HomeClientsStyled>


      {/* <ClientListComponent
          clientsList={clientsList}
          deleteAboutSection={""}
          editHandler={""}
        /> */}

      {/* Clients */}
<div className="text-center mb-5" style={{marginTop: "100px"}}>
        <span className="fs-1 px-4 py-2" style={{borderBottom: "1px solid #444444"}}>Testimonials</span>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="container">
            <div className="row">
              <div className="col-md-12 p-5 testimonials text-center">
                {isAdmin && hasPermission && (
                  <EditIcon
                    editHandler={() => editHandler("testmonial", true)}
                  />
                )}
                {/* Testimonials */}
                {testimonis.length < 1 ? (
                  (testimonis.length, "No Testimonials Found")
                ) : testimonis.length === 1 ? (
                  <h4>Please add 2 or more testimonials.</h4>
                ) : testimonis.length > 1 ? (
                  <Testimonials testimonis={testimonis} />
                ) : (
                  ""
                )}
                {/* {testimonis.length > 0 ? (

              <Testimonials testimonis={testimonis} />
            ) : (
              ""
            )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOME News */}
      <div className="row py-5 homeNews">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <div className="container">
            <h2 className="mb-5 fw-bold">News</h2>
            <div className="row">
              <HomeNews news={news} setNews={setNews} pagetype={pageType} />
            </div>
          </div>
        </div>


      {componentEdit.testmonial && (

        <div className="adminEditTestmonial">
          <AdminBanner
            editHandler={editHandler}
            componentType="testmonial"
            getImageListURL="testimonials/clientTestimonials/"
            deleteImageURL="testimonials/updateTestimonials/"
            imagePostURL="testimonials/createTestimonials/"
            imageUpdateURL="testimonials/updateTestimonials/"
            imageIndexURL="testimonials/updateTestimonialsindex/"
            imageLabel="Add your Image"
            titleTitle="Testmonial Name"
            descriptionTitle="Testimonial Writeup "
            showDescription={false}
            showExtraFormFields={getTestimonialsFields("testmonial")}
            dimensions={imageDimensionsJson("testimonial")}
          />
        </div>
      )}
</div>
      {show && <ModelBg />}
      {/* {showEditPop && <ModelBg />} */}
    </>
  );
};

export default Home;
