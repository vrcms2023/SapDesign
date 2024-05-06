import React from "react";
import { ClientStyled } from "../../Common/StyledComponents/Styled-Clients";
import { useSelector } from "react-redux";
import SkeletonImage from "../../Common/Skeltons/SkeletonImage";
import EditIcon from "../../Common/AdminEditIcon";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";
import {
  getImagePath,
  getListStyle,
  reorder,
  sortByFieldName,
  updateArrIndex,
} from "../../util/commonUtil";
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { axiosServiceApi } from "../../util/axiosUtil";

export const ClientListComponent = ({
  clientsList,
  setClientsList,
  deleteAboutSection,
  editHandler,
  getClinetDetails,
}) => {
  const { isLoading } = useSelector((state) => state.loader);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(clientsList, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "client_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response.length > 0) {
      setClientsList(response);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(`/client/updateindex/`, data);
      if (response?.data?.clientLogo) {
        return response.data.clientLogo;
      }
    } catch (error) {
      console.log("unable to save clinet position");
    }
  };

  return (
    <div>
      <ClientStyled>
        <div className="clients my-5">
          {isLoading && (
            <div className="row">
              {[1, 2, 3, 4].map((item, index) => (
                <div className="col-12" key={index}>
                  <SkeletonImage />
                </div>
              ))}
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            {clientsList.length > 0 ? (
              clientsList.map((item, index) => (
                <Droppable key={index} droppableId={item.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      <Client
                        item={item}
                        key={index}
                        index={index}
                        editHandler={editHandler}
                        deleteAboutSection={deleteAboutSection}
                      />

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))
            ) : (
              <div className="text-center text-muted py-5">
                {!isLoading && <p>Please add page contents...</p>}
              </div>
            )}
          </DragDropContext>
        </div>
      </ClientStyled>
    </div>
  );
};

const Client = ({ item, index, editHandler, deleteAboutSection }) => {
  const { isAdmin, hasPermission } = useAdminLoginStatus();
  return (
    <Draggable
      isDragDisabled={isAdmin ? false : true}
      key={item.id}
      draggableId={item.id}
      index={index}
      id={item.id}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                <Title title={item.client_title} cssClass="fs-4 fw-bold mb-2" />
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
        </div>
      )}
    </Draggable>
  );
};
