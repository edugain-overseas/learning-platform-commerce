import React, { useEffect, useState } from "react";

const WrapperWithDynamicBgImage = ({
  url,
  styles = {},
  children,
  ...otherProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = new Image();
        img.src = url;

        await img.decode();

        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadImage();
  }, [url]);

  return (
    <div
      style={{
        ...styles,
        backgroundImage: `${
          isLoaded ? "" : "linear-gradient(#fcfcfc, #fcfcfc),"
        } url(${url})`,
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default WrapperWithDynamicBgImage;
