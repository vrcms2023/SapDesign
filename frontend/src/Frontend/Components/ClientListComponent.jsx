import React from "react";
import { ClientStyled } from "../../Common/StyledComponents/Styled-Clients";
import { useSelector } from "react-redux";
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import EditIcon from "../../Common/AdminEditIcon";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";
import { getImagePath } from "../../util/commonUtil";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";

export const ClientListComponent = ({
  clientsList,
  deleteAboutSection,
  editHandler,
}) => {
  const { isLoading } = useSelector((state) => state.loader);
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <ClientStyled>
      <div className="clients my-5">
        {isLoading ? (
          <div className="row">
            {[1, 2, 3, 4].map((item, index) => (
              <div className="col-12" key={index}>
                <SkeletonImage />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {clientsList.length > 0 ? (
          clientsList.map((item, index) => (
            <>
              <div
                key={item.id}
                className={`row mb-2 ${
                  isAdmin ? "border border-warning mb-3 position-relative" : ""
                } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
              >
                {isAdmin && hasPermission && (
                  <>
                    <EditIcon
                      editHandler={() => editHandler("editSection", true, item)}
                    />
                    <Link
                      className="deleteSection"
                      onClick={() => deleteAboutSection(item)}
                    >
                      <i
                        className="fa fa-trash-o text-danger fs-4"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </>
                )}
                <div className="col-12 col-lg-10 p-3 p-md-4 py-md-4 d-flex justify-content-center align-items-start flex-column clientDetails">
                  {item.client_title && (
                    <Title
                      title={item.client_title}
                      cssClass="fs-4 fw-bold mb-2"
                    />
                  )}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.client_description,
                    }}
                  />
                </div>

                <div className="col-lg-2 d-none d-lg-block h-100 clientAvatar">
                  <img
                    src={getImagePath(item.path)}
                    alt=""
                    className="img-fluid rounded-circle border border-3 border-light shadow-lg img-thumbnail"
                  />
                </div>
              </div>
              <hr className="border-secondary" />
            </>
          ))
        ) : (
          <p className="text-center text-muted py-5">
            {!isLoading && <p>Please add page contents...</p>}
          </p>
        )}
      </div>
    </ClientStyled>
  );
};
