import styled from "styled-components";

export const HomeClientsStyled = styled.div`
  background-color: ${({ theme }) => theme.white};

  body {
    overflow-x: hidden; /* Hide horizontal scrollbar */
  }
  
.carousel-primary,
.carousel-secondary {
  left: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}

.carousel-primary img {
  width: 180px;
//   margin-left: 10px;
  border-radius: 14px;
}

.carousel-primary {
  display: flex;
  justify-content: space-around;
  animation: scroll-horizontal 20s linear infinite;
}

.carousel-secondary {
  animation: scroll-horizontal 20s linear infinite;
  animation-delay: 10s;
}

@keyframes scroll-horizontal {
  0% {
    // left: 0%;
    // transform: translateX(0);
  }

  100% {
    left: -100%;
    // transform: translateX(100%);
  }
}

.carousel-primary:hover,
.carousel-primary:hover~.carousel-secondary {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}

.carousel-secondary:hover {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}


.scroll-container:hover>.carousel-primary:not(:hover) {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}

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