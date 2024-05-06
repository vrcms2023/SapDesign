import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import FileUpload from "../../Components/FileUpload";
import DeleteDialog from "../../../Common/DeleteDialog";

import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { getCookie } from "../../../util/cookieUtil";
import {
  getObjectTitle,
  getObjectDescription,
  getImagePath,
  getDummyImage,
  getListStyle,
  reorder,
  updateArrIndex,
} from "../../../util/commonUtil";
import {
  axiosFileUploadServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useAdminLoginStatus from "../../../Common/customhook/useAdminLoginStatus";

const AdminBanner = ({
  editHandler,
  componentType,
  getImageListURL,
  deleteImageURL,
  imagePostURL,
  imageUpdateURL,
  carouselIndexURL,
  imageLabel = "Add Images",
  extraFormParamas,
  titleTitle = "Title",
  descriptionTitle = "Description",
  showDescription,
  showExtraFormFields,
  dimensions,
  validTypes = "image/png,image/jpeg",
}) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [carousel, setcarouseData] = useState([]);
  const [project, setProject] = useState({ id: projectID });

  const [editCarousel, setEditCarousel] = useState({});

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(getImageListURL);
        if (response?.status === 200) {
          let key = Object.keys(response.data);
          if (key.length > 1) {
            setcarouseData(response.data.results);
          } else {
            setcarouseData(response.data[key]);
          }
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getCarouselData();
  }, [imgGallery, getImageListURL]);

  const handleCarouselEdit = (event, carousel) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setEditCarousel(carousel);
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `${deleteImageURL}${id}/`
      );
      if (response.status === 204) {
        const list = imgGallery.filter((item) => item.id !== id);
        setImgGallery(list);
        setEditCarousel({});
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} image?`}
          />
        );
      },
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return true;

    const _items = reorder(carousel, source.index, destination.index);
    const _parentObjects = updateArrIndex(_items, "carouse_position");
    const response = await updateObjectsIndex(_parentObjects);
    if (response.length > 0) {
      setcarouseData(response);
    }
  };

  const updateObjectsIndex = async (data) => {
    try {
      let response = await axiosServiceApi.put(carouselIndexURL, data);
      if (response?.data?.carousel) {
        return response.data.carousel;
      }
    } catch (error) {
      console.log("unable to save clinet position");
    }
  };

  return (
    <div>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <hr className="m-0" />
      <div className="container">
        <div className="row d-flex flex-row-reverse">
          {carousel?.length > 0 ? (
            <div
              className="col-md-12 my-3"
              style={{ height: "120px", overflowY: "scroll" }}
            >
              <div className="container">
                <DragDropContext onDragEnd={onDragEnd}>
                  {carousel?.map((item, index) => (
                    <Droppable key={index} droppableId={item.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          <AdminCarouselItem
                            item={item}
                            index={index}
                            key={index}
                            componentType={componentType}
                            handleCarouselEdit={handleCarouselEdit}
                            thumbDelete={thumbDelete}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </DragDropContext>
              </div>
            </div>
          ) : (
            ""
          )}
          <hr className="" />
          <div
            className={`mb-5 mb-md-0 ${
              carousel?.length > 0 ? "col-md-12" : "col-md-12"
            }`}
          >
            <FileUpload
              title={imageLabel}
              project={project}
              updated_by={userName}
              category={componentType}
              gallerysetState={setImgGallery}
              maxFiles={1}
              galleryState={imgGallery}
              validTypes={validTypes}
              descriptionTitle={descriptionTitle}
              titleTitle={titleTitle}
              alternitivetextTitle="Image Alt Text"
              saveState={setSaveState}
              showDescription={showDescription}
              buttonLable="Save"
              editImage={editCarousel}
              setEditCarousel={setEditCarousel}
              imagePostURL={imagePostURL}
              imageUpdateURL={imageUpdateURL}
              extraFormParamas={extraFormParamas}
              showExtraFormFields={showExtraFormFields}
              dimensions={dimensions}
              closeHandler={closeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminCarouselItem = ({
  item,
  index,
  componentType,
  handleCarouselEdit,
  thumbDelete,
}) => {
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
          <div className="row mb-4 slideItem" key={index}>
            <div className="col-2 col-md-2">
              <i
                className="fa fa-picture-o fs-2 d-lg-none"
                aria-hidden="true"
              ></i>
              <img
                src={item.path ? getImagePath(item.path) : getDummyImage()}
                alt={item.alternitivetext}
                className="w-100 d-none d-lg-block"
              />
            </div>
            <div className="col col-md-8 ">
              <h6 className="fw-bold m-0 fs-6">
                {getObjectTitle(componentType, item)}
              </h6>
              <small className="description text-muted d-none d-md-block">
                {getObjectDescription(componentType, item)}
                {item.carouseDescription && item.carouseDescription}
                {item.image_description && item.image_description}
              </small>
            </div>
            <div className="col-4 col-md-2 d-flex justify-content-around align-items-center flex-md-row gap-3">
              <Link onClick={(event) => handleCarouselEdit(event, item)}>
                <i
                  className="fa fa-pencil fs-4 text-warning"
                  aria-hidden="true"
                ></i>
              </Link>
              <Link
                onClick={(event) =>
                  thumbDelete(item.id, getObjectTitle(componentType, item))
                }
              >
                <i
                  className="fa fa-trash fs-4 text-danger"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default AdminBanner;
