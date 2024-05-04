import styled from "styled-components";

export const TeamStyled = styled.div`
  background-color: ${({ theme }) => theme.teamBg};

  .title {
    color: ${({ theme }) => theme.teamTitleColor};
  }

  a {
    color: ${({ theme }) => theme.teamLinkColor};
  }

  .social i {
    color: ${({ theme }) => theme.teamIconColor};
    font-size: 2.3rem;
    margin: 10px;
  }

  img {
    object-fit: cover;
    object-position: top;
    border-radius: 5px !important;
  }

  .aboutMe {
  }
`;
