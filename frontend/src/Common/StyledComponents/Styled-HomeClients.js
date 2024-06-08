import styled from "styled-components";

export const HomeClientsStyled = styled.div`
// background-color: ${({ theme }) => theme.white};
// .clients-image-slider{
//     display: flex;
//     // place-it 
//     position: relative;
//     overflow: hidden;

//     height: 100%;  
//     width: 100%;
//     justify-content: flex-end;

//       &::before,
//       &::after {
//         background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
//         content: '';
//         height: 100%;
//         width: 15%;
//         z-index: 2;
//         position: absolute;
//       }
    
//       &::before {
//         left: 0;
//         top: 0;
//       }
    
//       &::after {
//         right: 0;
//         top: 0;
//         background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
//       }


//     .image-slider-track{
//       display: flex;
//       animation: play 20s linear infinite;
      
//       &:hover{
//         -webkit-animation-play-state: paused;
//         -moz-animation-play-state: paused;
//         -o-animation-play-state: paused;
//         animation-play-state: paused;
//       }
      
      
//       .slide{
//         // height: 150px;
//         width: 200px;
//         display: flex;
//         place-items: center;
//         padding: 15px;
//         perspective: 100px;
//         margin-right: 70px;

//         &:hover .clientPopOver {
//           bottom: 0;
//           left: 0;
//           right: 0;
//           // height: 100%;
//         }

//         .clientPopOver {
//           // top: 0px;
//           // z-index: 999;
//           // opacity: .8;
//           // transition: .5s ease;

//           position: absolute;
//           bottom: 100%;
//           left: 0;
//           right: 0;
//           background-color: #008CBA;
//           overflow: hidden;
//           width: 100%;
//           // height:0;
//           transition: .5s ease;
//           opacity: .85;
          
//           p {
//             margin: 0px 0 5px;
//             padding: 0;
//             transition: .5s ease;
//             justify-content: center;
//           align-items: center;
//           }
//         }

//         img{
//           height: 100%;
//           width:100%;
//         }
//     }
//   }

//   & + .viewAllBtn {
//     @media (max-width: 480px) {
//       width: 50%;
//       margin: auto
//     }
//   }
// }

// @keyframes play{
//     0%{
//         transform: translateX(100%);
//     }

//     100%{
//         transform: translateX(-100%);
//     }
// }

.tech-slideshow {
            height: 150px;
            max-width: 100%;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            // border: 1px solid black;

            @media(max-width: 480px) {
              height: 100px;
            }
        }

        .mover-1 {
            height: 150px;
            width: 10000px;
            position: absolute;
            overflow-x: hidden;
            top: 0;
            left: 0;
            display: flex;
            animation: moveSlideshow 20s ease-in-out infinite;

            @media(max-width: 768px) {
              height: 100px;
            }
        }

        .image-container {
            position: relative;
            display: inline-block;
            margin: 0;

            img {
              display: inline-block;
              vertical-align: middle;
              width: auto;
              height: 130px;
              object-fit-cover;
              position: relative;
              margin: 0 25px;   

              @media(max-width: 768px) {
                width: 120px;
                height: 100%;
              }
          }
        }

        .tech-slideshow:hover .mover-1 {
          cursor: pointer;
          animation-play-state: paused;
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            display: flex;
            justify-content: start;
            align-items: center;
            visibility: visible;
            opacity: 0;
            // transition: opacity 0.3s ease;
            z-index: 999;

            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            padding: 10px 0
        }

        .overlay p {
          margin: 0px !important;
          font-size: .9rem;
        }

        .image-container:hover .overlay {
            opacity: 1;

            &::-webkit-scrollbar {
              width: 8px;
            }
            
            &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 6px rgba(225,242,253,0.3); 
                border-radius: 3px;
            }
            
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px rgba(232,252,187,0.5); 
            }
        }


        // .text-list {
        //     list-style: none;
        //     padding: 0;
        //     margin: 0;
        //     text-align: center;
        // }

        // .text-item {
        //     margin: 5px 0;
        // }

        @keyframes moveSlideshow {
          0% { 
            transform: translateX(2%);  
          }
          75% { 
              transform: translateX(calc(-25%));  
          }
          100% { 
            transform: translateX(2%);  
          }
        }
`;
// https://www.youtube.com/watch?v=3Z780EOzIQs




// https://github.com/Coding-with-Robby/infinite-logo-carousel/tree/main

// https://codepen.io/kevinpowell/pen/BavVLra
// https://www.youtube.com/watch?v=iLmBy-HKIAwhttps://www.youtube.com/watch?v=iLmBy-HKIAw