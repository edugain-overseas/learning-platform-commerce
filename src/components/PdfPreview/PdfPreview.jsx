import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { pdfUrlToImages } from "../../utils/pdfToImages";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";

const PdfPreview = ({ pdfUrl, previewVisible, setPreviewVisible }) => {
  const [imgs, setImgs] = useState([]);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = useNotificationMessage();

  const isError = imgs.length === 0 && error;

  useEffect(() => {
    if (!pdfUrl) return;

    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setImgs([]);
        const pages = await pdfUrlToImages(pdfUrl);
        if (!cancelled) setImgs(pages);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load PDF");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {    
    if (previewVisible && isError) {
      messageApi.error({ content: error });
    }
  }, [previewVisible]);

  return (
    <>
      {contextHolder}
      {!isError && (
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (value) => {
              setPreviewVisible(value);
            },
          }}
        >
          <div style={{ display: "none" }}>
            {imgs.map((src, index) => (
              <Image key={index} src={src} />
            ))}
          </div>
        </Image.PreviewGroup>
      )}
    </>
  );
};

export default PdfPreview;
