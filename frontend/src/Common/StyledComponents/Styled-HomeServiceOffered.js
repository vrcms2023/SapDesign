import styled from "styled-components";

export const HomeServieOfferedStyled = styled.div`

.serviceOffered  {
    img {
        border-radius: 50px;
    height: 350px;
    width: 300px;
    object-fit:cover;
    border: 3px solid ${({ theme }) => theme.gray};
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
    object-fit: cover;
    cursor: pointer;

    &:hover {
        -webkit-filter: grayscale(0);
        filter: none;
        border: 3px solid ${({ theme }) => theme.black};
    }
    }   
}

.serviceOffered  + .dcarousel {
    width: 90vw;
    height: 90vh;
    top: 5vh !important;
}

.serviceOffered  + .dcarousel .carousel-item img {
    object-fit: cover;
    width: 90vw !important;
    height: 90vh !important;
    margin: 0 auto;
}
  
`;