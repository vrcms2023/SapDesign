import { createGlobalStyle } from "styled-components";
// import careerBgImg from "../../Images/careers-bg.jpg";

export const GlobalStyles = createGlobalStyle`
* {
    margin:0;
    padding: 0;
}

ul, li {
    margin: 0;
    padding:0;
    // list-style: none;
}

a {text-decoration: none}

h1, h2, h3, h4, h5, h6 {
    font-family: Poppins;
}

body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
}




.carousel-caption {
    h1 { color:${({ theme }) => theme.carouselSlideTitleColor};     }
    p { color:${({ theme }) => theme.carouselSlideCaptionColor}; }
}


.ABrief {
    background-color:${({ theme }) => theme.verylightgray}; 
    color:${({ theme }) => theme.ABriefTextColor};

      position: relative;

    .img-zoom-lens {
      position: absolute;
      border: 1px solid #000;
      /*set the size of the lens:*/
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }
    
    .img-zoom-result {
      border: 1px solid #f3f3f3;
      /*set the size of the result div:*/
      position: absolute;
      top: 150px;
      left: 0px;
      width: 150px;
      height: 150px;
      
    }
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) =>
  theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) =>
    theme.ABriefTitleBorderColor}; }

.ABriefAbout {
    background-color:${({ theme }) => theme.ABriefAboutBg}; 
    color:${({ theme }) => theme.ABriefAboutTextColor};
}

.ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) =>
  theme.ABriefAboutTitleBorderColor}; }

.ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({
  theme,
}) => theme.ABriefAboutTitleBorderColor}; }


.homeServices {
    color:${({ theme }) => theme.secondaryColor}; 
    h2 {
        color:${({ theme }) => theme.secondaryColor}; 
        border-color: ${({ theme }) => theme.primaryColor}; 
    }

    h3 {
        color:${({ theme }) => theme.secondaryColor}; 
    }

    a.btn {
        background-color:${({ theme }) => theme.primaryHoverColor};
    }

    a.btn:hover {
        background-color:${({ theme }) => theme.primaryColor};
    }
}

.btn {
    border-radius: 0.375rem !important;
    transition: all .35s;

    // &:hover svg { transform: rotate(-45deg);}
    &:hover {
      letter-spacing: .1rem;
    }
    &:hover svg { 
      transform: translateX(10px);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
}
.btn-primary {
    background-color:${({ theme }) => theme.primaryColor}; 
    color:${({ theme }) => theme.white};
}
.btn-primary:hover {
    background-color:${({ theme }) => theme.primaryHoverColor}; 
    color:${({ theme }) => theme.white};
}

.btn-secondary {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.black};
}

.btn-secondary:hover {
    background-color:${({ theme }) => theme.secondaryHoverColor}; 
    color:${({ theme }) => theme.lightgray};
}

.btn-outline {
    border: 1px solid ${({ theme }) => theme.black} !important; 
    color:${({ theme }) => theme.black} !important; 
}

.btn-outline:hover { 
    border: 1px solid ${({ theme }) => theme.black} !important; 
    color:${({ theme }) => theme.black};
}

.btn-more {
  border: 1px solid ${({ theme }) => theme.lightgray} !important; 
  color:${({ theme }) => theme.black};
}
.btn-more:hover {
  background-color:${({ theme }) => theme.white}; 
  border: 1px solid ${({ theme }) => theme.primaryColor} !important; 
  color:${({ theme }) => theme.primaryColor};
}

.homeCareers {
    background-color:${({ theme }) => theme.teritoryColor};
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div, p {
        text-align: center !important;
    }

    .briefIntro {
        padding-left: 0 !important;
        padding-bottom: 0 !important;
        
    }

    @media (max-width: 991px) {
    
        .briefIntro {
            padding-left: 1rem !important;
            padding-bottom: 1rem !important;
        }
    }
}

// Testimonial Component Styles

.testimonials {
    // background:${({ theme }) => theme.testimonialsBg};
    border: 1px solid ${({ theme }) => theme.lightgray};
    background: linear-gradient(90deg, rgba(0,0,0,0.25253851540616246) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,0.2497373949579832) 100%);
    color:${({ theme }) => theme.testimonialsLinkHoverColor};
    min-height: 530px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    // padding: 70px 75px !important;

    .testimonialComponent {
      width: 480px;

      @media (max-width: 480px) {
        width: 300px;
      }
    }

    .testimonialImg {
        width: 130px;
        height: 130px;
        object-fit: cover;
        
      }

      .next{
        position: relative;
        right: -100px;
    }
    
    .previous{
      position: relative;
      left: -100px
    }

      i.fa {
        color:${({ theme }) => theme.white};

        &:hover {
            color:${({ theme }) => theme.testimonialsLinkHoverColor};
        }
      }

    .title {color:${({ theme }) => theme.black};}
    p {color:${({ theme }) => theme.black};}

    .article {
        /* top: 0;
          left: 0; */
        /* width: 100%;
          height: 100%; */
        opacity: 0;
        transition: all 0.3s linear;
      }
      
      .article.activeSlide {
        opacity: 1;
        transform: translateX(0);
      }
      
      .fa-user {
        font-size: 100px;
      }
      .article.lastSlide {
        // transform: translateX(-100%); 
      }
      
      .article.nextSlide {
        //  transform: translateX(100%); 
      }
}

// End of Testimonial Component Styles //

.testimonialList img{
    width: 120px;
    height: 120px;
    box-shadow: 0 5px 5px ${({ theme }) => theme.teritoryColor};
}
.testimonialList:last-child {
    border: none !important
}

.lineClamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.lc1 {-webkit-line-clamp: 1;}
.lc2 {-webkit-line-clamp: 2;}
.lc3 {-webkit-line-clamp: 3;}
.lc4 {-webkit-line-clamp: 4;}
.lc5 {-webkit-line-clamp: 5;}

.cursorPointer {
  cursor: pointer
}

.pageTitle {
  color: ${({ theme }) => theme.pageTitleColor};
}



.newsModel {
        position: fixed;
        z-index: 999999;
        top: 0px;
        bottom: 0px;
        left: 0px;
        // width: 500px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .newsModel img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 0%;
      }
      
      .newsModalWrapper {
        width: 70%;
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .newsModalWrapper .newsDetails {
        max-height: 400px;
        overflow-y: auto;
      }
      
      @media (max-width: 768px) {
        .newsModalWrapper {
          width: 100%;
        }
      
        .newsModalWrapper .newsDetails {
          max-height: 300px;
        }
    }
    .error {
      color: ${({ theme }) => theme.error};
      text-align: center;
      margin: 0.5rem 0
    }


    .page-link {
      color: ${({ theme }) => theme.primaryColor} !important;
    }

    .active>.page-link, .page-link.active {
      background-color: ${({ theme }) => theme.primaryColor} !important; 
      color: ${({ theme }) => theme.white} !important;
      border-color: ${({ theme }) => theme.primaryColor} !important;
    }

    .deleteSection {
      position: absolute;
      top: 55px;
      right: 0px;
      z-index: 999;
      cursor: pointer;
      margin-top: 5px;
      width: auto !important;
      border: 2px dashed rgb(255, 193, 7);
      background-color: ${({ theme }) => theme.white};
      padding: 5px 12px;
    }

    .editIcon {
      right: 0px;
      padding: 0 !important;
    }
`;
