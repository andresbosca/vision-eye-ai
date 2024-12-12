import { useState, useEffect } from 'react';

export const useDimension = () => {
  const [dimensions, setDimensions] = useState({
    height: 640,
    width: 640,
  });

  return dimensions;
};
