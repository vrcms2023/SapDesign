import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Admin/Components/forms/ImgTitleIntoForm-List";
import EditIcon from "../../../Common/AdminEditIcon";
import AutoScroll from "../../Components/AutoScroll/AutoScroll";
import ABrief from "../../Components/ABrief";
import HomeNews from "../../Components/HomeNews";
import { HomeClientItem } from "../../Components/HomeClientItem";
import { TeamMember } from "../Team";
import { TeamStyled } from "../../../Common/StyledComponents/Styled-Team";
import Title from "../../../Common/Title";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
import { HomeClientsStyled } from "../../../Common/StyledComponents/Styled-HomeClients";
import Banner from "../../../Common/Banner";
import ServiceOfferedComponent from "../../Components/ServiceOfferedComponent";

import ImageInputsForm from "../../../Admin/Components/forms/ImgTitleIntoForm";

import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import {
  getFormDynamicFields,
  getTestimonialsFields,
  getserviceOfferedFields,
  imageDimensionsJson,
} from "../../../util/dynamicFormFields";
import { sortByFieldName } from "../../../util/commonUtil";

// Styles

import "./Home.css";
import { ImageGalleryStyled } from "../../../Common/StyledComponents/Styled-ImageGallery";

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
  const [executives, setExecutives] = useState([]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(value);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getTeamMemberDetails = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/ourteam/clentViewOurTeamDetails/`
        );
        if (response?.status === 200) {
          setExecutives(response.data.results);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.addSection || !componentEdit.editSection) {
      getTeamMemberDetails();
    }
  }, [componentEdit.addSection, componentEdit.editSection]);

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
        console.log("Response Clients",  response)
        if (response?.status === 200) {
          const _clientList = sortByFieldName(
            response.data.clientLogo,
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

        {/* Services Offered */}

        <div
          className="text-center mb-5 pb-0 pb-md-5"
          style={{ marginTop: "100px" }}
        >
          <Title
            title="Services Offered"
            cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
          />
          <span
            className="w-25 d-block m-auto"
            style={{ borderBottom: "1px solid #444444" }}
          ></span>
        </div>

        <div className="row">
          <div className="col-md-12 carousel">
            {isAdmin && hasPermission && (
              <EditIcon
                editHandler={() => editHandler("serviceOffered", true)}
              />
            )}

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
              imageLabel="Add Images"
              showDescription={false}
              showExtraFormFields={getserviceOfferedFields(serviceOffered)}
              dimensions={imageDimensionsJson("carousel")}
            />
          </div>
        )}

        {/* Image Gallery Carousel */}

        <ImageGalleryStyled>
          <div
            className="text-center mb-5 pb-0 pb-md-5"
            style={{ marginTop: "100px" }}
          >
            <Title
              title="View Gallery"
              cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
            />
            <span
              className="w-25 d-block m-auto"
              style={{ borderBottom: "1px solid #444444" }}
            ></span>
          </div>
          {isAdmin && hasPermission && (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-end mb-4">
                    <Link
                      to="/imagegallery"
                      className="btn btn-primary"
                      // onClick={() => editHandler("addNews", true)}
                    >
                      Goto Gallery Page
                      <i
                        className="fa fa-arrow-right ms-2"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
              <div className="container">
                <div className="row sapHomeCarousel">
                <div className="col-12 p-0 homeGalleryCarousel">
                  <Carousel carouselState={componentEdit.carousel} />
                </div>
                </div>
          </div>
          <div className="d-block d-lg-none text-center py-4 position-relative viewAllBtn">
            <Link to="/imageGallery" className="btn btn-outline">
              View All
            </Link>
          </div>
        </ImageGalleryStyled>

      {/* Clients */}

        <HomeClientsStyled>
          <div
            className="text-center mb-5 pb-0 pb-md-5"
            style={{ marginTop: "100px" }}
          >
            <Title
              title="Clients"
              cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
            />
            <span
              className="w-25 d-block m-auto"
              style={{ borderBottom: "1px solid #444444" }}
            ></span>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {isAdmin && hasPermission && (
                  <div className="text-end mb-4">
                    <Link
                      to="/clients"
                      className="btn btn-primary"
                      // onClick={() => editHandler("addNews", true)}
                    >
                      Goto Clients Page
                      <i
                        className="fa fa-arrow-right ms-2"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
              
             
           <AutoScroll clients={clientsList}/>
                
            
          {/* <div class="tech-slideshow">
            <div class="mover-1">
              {clientsList?.map((client) => {
                return <HomeClientItem client={client} key={client.id} />;
                
              })}
            </div>
          </div> */}

          {/* <div className="clients-image-slider">
            <div className="image-slider-track">
              {clientsList.map((client) => {
                return <HomeClientItem client={client} key={client.id} />;
              })}
            </div>
          </div> */}
          <div className="text-center py-4 mt-3 position-relative viewAllBtn">
            <Link to="/clients" className="btn btn-outline">
              View All
            </Link>
          </div>
        </HomeClientsStyled>

        {/* Testimonials */}
        <div
          className="text-center mb-5 pb-0 pb-md-5"
          style={{ marginTop: "100px" }}
        >
          <Title
            title="Testimonials"
            cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
          />
          <span
            className="w-25 d-block m-auto"
            style={{ borderBottom: "1px solid #444444" }}
          ></span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isAdmin && hasPermission && (
                <div className="text-end mb-4">
                  <Link
                    to="/testimonials"
                    className="btn btn-primary"
                    // onClick={() => editHandler("addNews", true)}
                  >
                    Goto Testimonials Page
                    <i
                      className="fa fa-arrow-right ms-2"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
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
                </div>
              </div>
            </div>
          </div>
          <div className="text-center py-4 mt-3 position-relative viewAllBtn">
            <Link to="/testimonials" className="btn btn-outline">
              View All
            </Link>
          </div>
        </div>

        {/* Executive Profile */}
        <div
          className="text-center mb-5 pb-0 pb-md-5"
          style={{ marginTop: "100px" }}
        >
          <Title
            title="Executive Profile"
            cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
          />
          <span
            className="w-25 d-block m-auto"
            style={{ borderBottom: "1px solid #444444" }}
          ></span>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isAdmin && hasPermission && (
                <div className="text-end mb-4">
                  <Link
                    to="/team"
                    className="btn btn-primary"
                    // onClick={() => editHandler("addNews", true)}
                  >
                    Goto Teams Page
                    <i
                      className="fa fa-arrow-right ms-2"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <TeamStyled>
          <div className="container">
            <div className="row">
              {executives.length > 0
                ? executives.map((item, index) => (
                    <div
                      className="col-md-6 my-4 my-md-0 text-center"
                      key={index}
                    >
                      <TeamMember
                        item={item}
                        key={index}
                        index={index}
                        deleteAboutSection={""}
                        editHandler={""}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </TeamStyled>

        {/* HOME News */}
        <div
          className="text-center mb-5 pb-0 pb-md-5"
          style={{ marginTop: "100px" }}
        >
          <Title
            title="News"
            cssClass="fs-1 fw-medium px-4 py-2 text-black text-center"
          />
          <span
            className="w-25 d-block m-auto"
            style={{ borderBottom: "1px solid #444444" }}
          ></span>
        </div>
        <div className="row pb-5 homeNews">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              {isAdmin && hasPermission && (
                <div className="text-end mb-4">
                  <Link
                    to="/news"
                    className="btn btn-primary"
                    // onClick={() => editHandler("addNews", true)}
                  >
                    Goto News Page
                    <i
                      className="fa fa-arrow-right ms-2"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              )}
              <HomeNews news={news} setNews={setNews} pagetype={pageType} />
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
      </div>
      
    </>
  );
};

export default Home;
