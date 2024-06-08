import React from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { getImagePath } from '../../../util/commonUtil';


const AutoplayExample = ({clients}) => {
  const options = {
    type         : 'loop',
    perPage      : 5,
    autoScroll: {
      pauseOnHover: true,
      pauseOnFocus: true,
      rewind: false,
      speed: 2,
    },
    drag   : 'free',
    focus  : 'center',
    gap          : '2rem',
    resetProgress: false,
    height       : '15rem',
    arrows: false,
    pagination: false,

  };
  
  return (
    <div className="wrapper">
      {/* <h2 id="autoplay-example-heading">Autoplay</h2> */}
      <Splide
        options={ options }
        aria-labelledby="autoplay-example-heading"
        hasTrack={ false }
        extensions={ { AutoScroll } }
      >
          <SplideTrack>
            { clients?.map( client => (
              <SplideSlide key={client.id}>
                <div className="overlay"
              dangerouslySetInnerHTML={{
                __html: client?.client_description,
              }}
            />
                <img src={getImagePath(client.path)} alt={client.client_title}/>
                
              </SplideSlide>
            ) ) }
          </SplideTrack>

        

        {/* <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div> */}

        {/* <button className="splide__toggle">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button> */}
      </Splide>
    </div>
  );
};

export default AutoplayExample;