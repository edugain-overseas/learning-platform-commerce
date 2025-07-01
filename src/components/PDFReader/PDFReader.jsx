import React, { useEffect, useRef, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ReactComponent as ArrowLeftIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
import styles from "./PDFReader.module.scss";
import samplePdf from "../../images/simple.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const INTERVAL_DELAY = 5000;

const PDFReader = ({ pdf = samplePdf }) => {
  // const [fileObj] = useState({ url: pdf });
  const [fileObj] = useState({ url: samplePdf });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [layoutMode, setLayoutMode] = useState("single");
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pageOriginalProps, setPageOriginalProps] = useState(null);
  const [scale, setScale] = useState(1);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const mouseMoveTimeoutRef = useRef(null);

  const fullscreen =
    document.fullscreenElement &&
    document.fullscreenElement === containerRef.current;

  // Handle PDF load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    updateContainerWidth();
  };

  // Determine layout mode and set page original props for future calculations
  const onPageLoadSuccess = ({ width, height }) => {
    setLayoutMode(width >= height ? "single" : "double");
    setPageOriginalProps({ width, height });
  };

  // Update container width
  const updateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Handle page scale to avoid overflowing container in fullsceen mode
  useEffect(() => {
    const calculateScale = () => {
      if (!fullscreen) return 1;

      const originalFrameWidth =
        layoutMode === "single"
          ? pageOriginalProps?.width
          : pageOriginalProps?.width * 2;

      const containerRatio =
        containerRef.current?.clientWidth / containerRef.current?.clientHeight;

      const originalFrameRatio = originalFrameWidth / pageOriginalProps?.height;

      if (originalFrameRatio > containerRatio) {
        return containerRatio / originalFrameRatio;
      }
      return originalFrameRatio / containerRatio;
    };

    updateContainerWidth();
    setScale(calculateScale());
    // eslint-disable-next-line
  }, [updateContainerWidth, fullscreen]);

  // Auto-play logic
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setPageNumber((prev) => (prev === numPages ? 1 : prev + 1));
      }, INTERVAL_DELAY);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, numPages]);

  // Controls visibility on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(mouseMoveTimeoutRef.current);
    mouseMoveTimeoutRef.current = setTimeout(
      () => setShowControls(false),
      2500
    );
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (fullscreen) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  // Page width based on mode
  const getPageWidth = () => {
    if (!containerWidth) return undefined;
    return layoutMode === "double" ? containerWidth / 2 : containerWidth;
  };

  // Controls
  const goToPrevPage = () => {
    setPageNumber((prev) => {
      if (layoutMode === "double") {
        return prev > 2 ? prev - 2 : prev - 1;
      }
      return prev - 1;
    });
  };

  const goToNextPage = () => {
    setPageNumber((prev) => {
      const nextPagesAmount = numPages - prev;

      if (!nextPagesAmount) return 1;

      if (layoutMode === "double") {
        return nextPagesAmount >= 2 ? prev + 2 : prev + 1;
      }
      return prev === numPages ? 1 : prev + 1;
    });
  };

  return (
    <div style={{ maxWidth: "880rem" }}>
      <div
        ref={containerRef}
        className={styles.documentContainer}
        onMouseMove={handleMouseMove}
        onClick={handleMouseMove}
        style={{ maxWidth: fullscreen ? "100%" : "880rem" }}
      >
        <Document
          onLoadSuccess={onDocumentLoadSuccess}
          file={fileObj}
          onLoadError={console.error}
          className={`${styles.document} ${
            layoutMode === "double" && styles.documentFlex
          }`}
        >
          {containerWidth > 0 && (
            <>
              {layoutMode === "single" ? (
                <>
                  <Page
                    pageNumber={pageNumber}
                    width={getPageWidth()}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    className={styles.page}
                    scale={scale}
                  />
                  {pageNumber + 1 <= numPages && (
                    <Page
                      pageNumber={pageNumber + 1}
                      width={getPageWidth()}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      onLoadSuccess={onPageLoadSuccess}
                      className={`${styles.page} ${styles.hidden}`}
                      scale={scale}
                    />
                  )}
                </>
              ) : (
                <>
                  <Page
                    pageNumber={pageNumber}
                    width={getPageWidth()}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    onLoadSuccess={onPageLoadSuccess}
                    className={styles.page}
                    scale={scale}
                  />
                  {pageNumber < numPages && (
                    <Page
                      pageNumber={pageNumber + 1}
                      width={getPageWidth()}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className={styles.page}
                      scale={scale}
                    />
                  )}
                  {pageNumber + 1 < numPages && (
                    <Page
                      pageNumber={pageNumber + 2}
                      width={getPageWidth()}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      onLoadSuccess={onPageLoadSuccess}
                      className={`${styles.page} ${styles.hidden}`}
                      scale={scale}
                    />
                  )}
                  {pageNumber + 2 < numPages && (
                    <Page
                      pageNumber={pageNumber + 3}
                      width={getPageWidth()}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className={`${styles.page} ${styles.hidden}`}
                      scale={scale}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Document>

        <div
          className={`${styles.controlPanel} ${
            showControls ? styles.active : ""
          }`}
        >
          <div className={styles.controlsCenter}>
            <button onClick={goToPrevPage} disabled={pageNumber === 1}>
              <ArrowLeftIcon />
            </button>
            <button onClick={() => setPlaying((prev) => !prev)}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={goToNextPage}>
              <ArrowLeftIcon style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
          <div className={styles.controlsBottom}>
            <span className={styles.pagesInfo}>
              {pageNumber} / {numPages}
            </span>
            <button onClick={toggleFullscreen}>
              <FullscreenIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.pdf === nextProps.pdf;
}

export default React.memo(PDFReader, areEqual);
