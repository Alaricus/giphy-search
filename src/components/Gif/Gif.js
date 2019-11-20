import React from 'react';
import './Gif.css';

const Gif = ({ data }) => {
  const { title, images, bitly_url: bitlyUrl } = data;

  return (
    <div className="gif">
      <a href={bitlyUrl}>
        <img src={images.fixed_height.url} alt={title} />
      </a>
    </div>
  );
};

export default Gif;
