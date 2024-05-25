import styled from "styled-components";

export const ImageGalleryStyled = styled.div`



  .gallery img {
    cursor: pointer;
    border: 3px solid ${({ theme }) => theme.gray};
    border-radius: 25px;
    height: 200px;
    filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
  object-fit: cover;

    &:hover {
        -webkit-filter: grayscale(0);
        filter: none;
        border: 3px solid ${({ theme }) => theme.black};
    }
  }


  .homeGalleryCarousel {
    background: ${({ theme }) => theme.black};
    border-radius: 30px;
    height: 350px;

    .container {
        margin-top: 130px;
    }

    .carousel-item, carousel-inner {
        border-radius: 30px;
    }
    .carousel-item img {
        height: 400px !important;
        border-radius: 30px;
    }

    .carousel-control-prev, .carousel-control-next {
        right: -14%;
        top: -40%;
    }

    .carousel-control-prev {
        left: -14%;
    }

    .carousel-control-prev span, .carousel-control-next span {
        border: 2px solid #fff;
        border-radius: 50px;
        background-size: 20px;
    }

    @media (max-width: 480px) {
      .container {
        margin-top: 100px;
      }
      .carousel-control-prev, .carousel-control-next {
        right: 20%;
        top: -30%;
    }

    .carousel-control-prev {
        left: 20%;
    }
    .carousel-control-next, .carousel-control-prev {
      height: 10vh;
      width: 20%;
    }
    .carousel-item img {
      height: 280px !important;
    }
    }
  }

  .sapHomeCarousel {
    & + .viewAllBtn {
      margin-top: 200px;
      @media (max-width: 480px) {
        margin-top: 50px !important; 
        width: 50%;
        margin: auto
      }
    }
  }
  
`;
