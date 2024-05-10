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
      <div className="slide" onMouseEnter={mouseOver} onMouseLeave={mouseOut}>
        <img src={client.path} alt={client.client_title} key={client.id} />
      </div>
      {hover && (
        <div
          className="position-absolute"
          dangerouslySetInnerHTML={{
            __html: client?.client_description,
          }}
        />
      )}
    </div>
  );
};
