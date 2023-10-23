import React from 'react';

const Card = ({ image, alt, title, text, styles }) => {
  return (
    <div
      className={`${styles} border w-52 h-52 px-4 text-center flex flex-col justify-center items-center rounded-lg shadow-md`}
    >
      <img src={image} alt={alt} className="w-12 mt-4" />
      <h3 className="font-raley mt-2 font-extrabold text-sm">{title}</h3>
      <p className="font-sans text-center text-sm my-2">{text}</p>
    </div>
  );
};

export default Card;
