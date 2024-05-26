import BgSymbol from "../../Images/logo-symbol.svg";

import styled from "styled-components";

export const FooterStyled = styled.div`
  color: ${({ theme }) => theme.footerTextColor};
  // border-top: 1px solid ${({ theme }) => theme.lightgray};
  background: linear-gradient(0deg, rgba(116,142,49,.6) 0%, rgba(255,255,255,1) 75%);

  // background-image: url(${BgSymbol});
  // background-repeat: no-repeat;
  // background-position: 120% -250px;
  // background-size: 40%;

  

  a {
    color: ${({ theme }) => theme.footerLinkColor};
    &:hover {
      color: ${({ theme }) => theme.footerLinkHoverColor};
    }
  }

  ul {
    list-style: none;

    li {
      padding: 4px 0;

      @media (max-width: 576px) {
        padding: 8px 0;
      }
    }
  }

  .title {
    color: ${({ theme }) => theme.primaryColor};
    // margin: 0 0 20px;
    // font-size: 1.6rem;
    // text-align: left
  }

  .reachUs p {
    word-wrap: break-word;
  }

  @media (max-width: 991px ) {
    .footerLogo {
      width: 95%;
    }
  }

  @media (max-width: 768px ) {
    .footerLogo {
      width: 50%;
    }
  }
  

  .socialLinks {
    // padding: 15px 0;

    img {
      width: 70%;
    }

    i {
      font-size: 2.5rem;
      margin: 25px 10px 0;
      color: ${({ theme }) => theme.black};
    }
  }

  .footerDetails {
    color: ${({ theme }) => theme.black};

    a {
      color: ${({ theme }) => theme.black};
    }
  }

  .footerCopyRights {
    background-color: ${({ theme }) => theme.footerBgColor};
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem !important;

    a {
      color: ${({ theme }) => theme.footerLinkColor};
      font-size: 0.8rem !important;
      &:hover {
        color: ${({ theme }) => theme.footerLinkHoverColor};
      }
    }

    .dby,
    .dby a {
      font-size: 0.85rem;
      color: #999999
    }
  }

  @media (max-width: 991px) {
    .socialLinks {
      img {
        width: 50%;
      }
      i {
        font-size: 3rem;
        margin: 24px 12px 0;
      }
    }

    li {
      padding: 7px 0;
    }
  }
`;
