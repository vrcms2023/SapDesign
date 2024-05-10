import React, { useState } from "react";

export const HomeClientItem = ({ client }) => {
  const [hover, setHover] = useState(false);

  const mouseOver = (event) => {
    setHover(true);
  };

  const mouseOut = (event) => {
    setHover(false);
  };
  return (
    <div className="position-relative">
      <div className="slide" onMouseEnter={mouseOver} onMouseLeave={mouseOut} >
        <img src={client.path} alt={client.client_title} key={client.id} />
      </div>
      {hover && (
        <div
          className="position-absolute p-3 w-100 rounded-3 bg-dark text-white" 
          style={{top: 0, zIndex: "999", opacity: ".8", height: "200px", minHeight: "200px"}}
          dangerouslySetInnerHTML={{
            __html: client?.client_description,
          }}
        />
      )}
    </div>
  );
};
