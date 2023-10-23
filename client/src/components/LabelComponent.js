import React from 'react';

const LabelComponent = ({ name, htmlFor }) => {
  return (
    <label
      className="block text-grey-darker text-sm font-bold font-rale  mb-2"
      htmlFor={htmlFor}
    >
      {name}
    </label>
  );
};

export default LabelComponent;
