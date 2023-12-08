import { useEffect } from 'react';

const useAdjustFontSize = () => {
  const adjustFontSize = () => {
    const vw = window.innerWidth;
    let fontSize;
    if (vw >= 992) {
      fontSize = vw / 1440;
    } else {
      fontSize = vw / 360;
    }
    document.documentElement.style.fontSize = `${fontSize}px`;
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);

    return () => {
      window.removeEventListener('resize', adjustFontSize);
    };
  }, []);
};

export default useAdjustFontSize;
