import styled from "styled-components";

export const HomeServieOfferedStyled = styled.div`

.serviceOffered  {
    img {
        width: 300px;
        height: 200px;
        object-fit:cover;
        border: 3px solid ${({ theme }) => theme.gray};
        filter: gray; /* IE6-9 */
        -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
        filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
        cursor: pointer;
        transition:  filter 0.9s ease;

        @media (max-width: 991px) {
                width: 200px;
                height: 160px;
        }
    
        @media (max-width: 576px) {
                width: 90%;
                height: auto;
        }

        &:hover {
            -webkit-filter: grayscale(0);
            filter: none;
            object-fit:cover;
            border: 3px solid ${({ theme }) => theme.black};

            + h4 {
                letter-spacing: 5px;
            }
        }

        + h4 {
            letter-spacing: 0px;
            transition: all .4s ease-in;
            font-size: 1.4rem;

            @media (max-width: 768px) {
                font-size: 1.2rem
            }
        }
    }
}

.carousel-item img{
    height: auto;
}

.serviceOffered  + .dcarousel {
    // width: 90vw;
    // height: 90vh;
    top: 5vh !important;
    @media(max-width: 768px) {
        top: calc(100% - 65vh) !important;
    }

    .carousel-control-prev, .carousel-control-next {
       
        span {
            display: none
        }

        @media (max-width: 768px) {
            .carousel-control-prev, .carousel-control-next {
                height: 30vh;
               
            }
        }
    }

    .closeCarousel{
        color: ${({ theme }) => theme.white} !important;
        right: 10px;
        top: 10px;
    }
}

.serviceOffered  + .dcarousel .carousel-item  {
    background: none;
}

.serviceOffered  + .dcarousel .carousel-item img {
    // object-fit: cover;
    // width: 90vw !important;
    // height: 90vh !important;
    // margin: 0 auto;
}
`;


// =======================



// import styled from "styled-components";

// export const HomeServieOfferedStyled = styled.div`

// .serviceOffered  {
//     img {
//         border-radius: 50px;
//         height: 350px;
//         width: 300px;
//         object-fit:cover;
//         border: 3px solid ${({ theme }) => theme.gray};
//         filter: gray; /* IE6-9 */
//         -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
//         filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
//         object-fit: cover;
//         cursor: pointer;
//         transition: .9s ease;

//         &:hover {
//             -webkit-filter: grayscale(0);
//             filter: none;
//             border: 3px solid ${({ theme }) => theme.black};

//             + h4 {
//                 letter-spacing: 5px;
//             }
//         }

//         + h4 {
           
//             letter-spacing: 0px;
//             transition: all .4s ease-in;
//         }
        
//     }
// }

// @media (max-width: 768px) {
//     .serviceOffered  {
//         img {
//             height: 250px;
//             width: 200px;
//         }
//     }
// }

// @media (max-width: 576px) {
//     .serviceOffered  {
//         img {
//             width: 90%;
//         }
//     }
// }

// .serviceOffered  + .dcarousel {
//     width: 90vw;
//     height: 90vh;
//     top: 5vh !important;
// }

// .serviceOffered  + .dcarousel .carousel-item img {
//     object-fit: cover;
//     width: 90vw !important;
//     height: 90vh !important;
//     margin: 0 auto;
// }
  
// `;
