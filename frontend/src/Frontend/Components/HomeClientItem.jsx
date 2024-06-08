import React, { useState } from "react";
import { getImagePath } from "../../util/commonUtil";

export const HomeClientItem = ({ client }) => {
  const [hover, setHover] = useState(false);

  const mouseOver = (event) => {
    setHover(true);
  };

  const mouseOut = (event) => {
    setHover(false);
  };
  return (
    <div class="image-container" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
        <img src={getImagePath(client.path)} alt={client.client_title} key={client.id} className="shadow-sm" />
            <div className="overlay"
              dangerouslySetInnerHTML={{
                __html: client?.client_description,
              }}
            />
        
          {/* {hover && (
            <div
              dangerouslySetInnerHTML={{
                __html: client?.client_description,
              }}
            />
          )} */}
    </div>

    // <div
    //   className="position-relative"
    //   onMouseEnter={mouseOver}
    //   onMouseLeave={mouseOut}
    // >
    //   <div className="slide">
    //     <img src={getImagePath(client.path)} alt={client.client_title} key={client.id} />
    //     {hover && (
    //     <div
    //       className="position-absolute p-3 w-100 rounded-3 bg-dark text-white clientPopOver"
         
    //       dangerouslySetInnerHTML={{
    //         __html: client?.client_description,
    //       }}
    //     />
    //   )}
    //   </div>
      
    // </div>
  );
};
