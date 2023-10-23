import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WithClickOutside = (WrappedComponent) => {
  const Component = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const ref = useRef(null);

    const clickOutside = () => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
    };

    const setRef = useCallback(() => {
      clickOutside();
      return [ref];
    }, []);

    useEffect(() => {
      open && setOpen(false);
    }, [location.key]);
    const [newRef] = setRef();

    return <WrappedComponent open={open} setOpen={setOpen} ref={newRef} />;
  };

  return Component;
};

export default WithClickOutside;
