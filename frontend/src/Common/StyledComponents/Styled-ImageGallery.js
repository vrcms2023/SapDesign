import styled from "styled-components";

export const ImageGalleryStyled = styled.div`

  .gallery img {
    cursor: pointer;
    border: 3px solid ${({ theme }) => theme.gray};
    border-radius: 25px;
    heigh: 200px;
    filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */

  &:hover {
    -webkit-filter: grayscale(0);
    filter: none;
    border: 3px solid ${({ theme }) => theme.black};
  }
  }
`;
