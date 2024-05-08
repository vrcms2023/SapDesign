import styled from "styled-components";

export const ClientStyled = styled.div`
  // .clients hr:last-child {
  //   display: none;
  // }
  .clientAvatar img {
    width: 50%;
  }
 
  .clientFrontend  {
    border-radius: 50px;

    .details p {
      margin: 0px
    }

    &.overlayContainer {
      position: relative;
      // width: 50%;
      // max-width: 300px;
    }
    
    /* Make the image to responsive */
    .image {
      display: block;
      // width: 100%;
      // height: auto;
    }
  
    .overlay {
      position: absolute;
      bottom: 0;
      background: rgb(0, 0, 0);
      background: rgba(0, 0, 0, .8); /* Black see-through */
      color: #f1f1f1;
      width: 100%;
      transition: .5s ease;
      opacity:0;
      color: white;
      font-size: 20px;
      padding: 20px;
      border-radius: 50px;
      text-align: center;
      visibility: visible !important;
    }
  
    &.overlayContainer:hover .overlay {
      opacity: 1;
    }
  }

  
`;
