import styled from "styled-components";

export const HomeClientsStyled = styled.div`
  background-color: ${({ theme }) => theme.white};


.slide{
    height: 150px;
    width: 200px;
    display: grid;
    place-items: center;
    padding: 15px;
    perspective: 100px;
    margin-right: 70px;
}

img{
    height: 100%;
    width:100%;
    transition: transform 1s;
}
.image-slider{
    display: flex;
    place-items: center;
    position: relative;
    overflow: hidden;
    height: 250px;  
    width: 100%;
    justify-content: flex-end;
}

.image-slider-track{
    display: flex;
    // width:calc(200px*18);
    animation: play 30s linear infinite;
}

.image-slider-track:hover{
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}

// @keyframes play{
//     0%{
//         transform: translateX(100%);
//     }

//     100%{
//         transform: translateX(-120%);
//     }
// }

  .image-slider::before,
  .image-slider::after{
      background: linear-gradient(to right,rgba(255,255,255,1)0%,rgba(255,255,255,0)100%);
      content: '';
      height: 100%;
      width: 15%;
      z-index: 2;
      position: absolute;
  }

    .image-slider::before{
        left:0;
        top:0;
    }

    .image-slider::after{
        right:0;
        top:0;
        background: linear-gradient(to left,rgba(255,255,255,1)0%,rgba(255,255,255,0)100%);
    }

    // img:hover{
    //     transform: translateZ(20px);
    // }
    


  // body {
  //   overflow-x: hidden; /* Hide horizontal scrollbar */
  // }
  
  // MODEL 2
// .carousel-primary,
// .carousel-secondary {
//   left: 100%;
//   width: 100%;
//   overflow: hidden;
//   position: absolute;
//   white-space: nowrap;
// }

// .carousel-primary img {
//   width: 180px;
// //   margin-left: 10px;
//   border-radius: 14px;
// }

// .carousel-primary {
//   display: flex;
//   justify-content: space-around;
//   animation: scroll-horizontal 20s linear infinite;
// }

// .carousel-secondary {
//   animation: scroll-horizontal 20s linear infinite;
//   animation-delay: 10s;
// }

// @keyframes scroll-horizontal {
//   0% {
//     left: 0%;
//     // transform: translateX(0);
//   }

//   100% {
//     left: -100%;
//     // transform: translateX(100%);
//   }
// }

// .carousel-primary:hover,
// .carousel-primary:hover~.carousel-secondary {
  // -webkit-animation-play-state: paused;
  // -moz-animation-play-state: paused;
  // -o-animation-play-state: paused;
  // animation-play-state: paused;
// }

// .carousel-secondary:hover {
//   -webkit-animation-play-state: paused;
//   -moz-animation-play-state: paused;
//   -o-animation-play-state: paused;
//   animation-play-state: paused;
// }


// .scroll-container:hover>.carousel-primary:not(:hover) {
//   -webkit-animation-play-state: paused;
//   -moz-animation-play-state: paused;
//   -o-animation-play-state: paused;
//   animation-play-state: paused;
// }


// Model 1

// .slider {
//     height: 250px;
//     margin: auto;
//     position: relative;
//     width: 90%;
//     display: gird;
//     place-items: center;
//     overflow: hidden;
// }

// .slide-track {
//     display: flex;
//     width: calc(200px * 10);
//     animation: scroll 30s linear infinite;
// }

// .slide-track:hover {
//     animation-play-state: paused
// }

// @keyframes scroll {
//     0% {
//         transform: translateX(calc(-200px * 5));
//     }

//     100% {
//         transform: translateX(calc(200px * 5));
//     }
// }

// .slide {
//     height: 200px;
//     width: 200px;
//     display: flex;
//     align-items:center;
//     padding: 25px;
//     perspective: 100px;
// }

// img {
//     width: 100%;
//     transition: transform 1s;
//     cursor: pointer;

//     &:hover {
//         transform: translateZ(20px);
//     }
// }


// .slide:before, .slide:after {
//     background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
//     content: "";
//     height: 100%;
//     position: absolute;
//     width: 15%;
//     z-index: 2
// }

// .slide:before {
//     left: 0px;
//     top: 0px;
// }

// .slide:after {
//     right: 0px;
//     top: 0px;
//     transform: rotateZ(180deg);
// }
 
  

`;
// https://www.youtube.com/watch?v=3Z780EOzIQs




// https://github.com/Coding-with-Robby/infinite-logo-carousel/tree/main

// https://codepen.io/kevinpowell/pen/BavVLra
// https://www.youtube.com/watch?v=iLmBy-HKIAwhttps://www.youtube.com/watch?v=iLmBy-HKIAw