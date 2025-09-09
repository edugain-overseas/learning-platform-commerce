import React, { useEffect, useRef, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ReactComponent as ArrowLeftIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
import Skeleton from "../shared/Skeleton/Skeleton";
import styles from "./PDFReader.module.scss";
import sample from "../../images/simple.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const INTERVAL_DELAY = 5000;

const PDFReader = ({ pdf }) => {
  const [fileObj] = useState({ url: sample });
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
      console.log(containerRef.current.clientWidth);

      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Handle page scale to avoid overflowing container and listening keypress event in fullscreen mode
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
    const handleKeydown = (event) => {
      const { code } = event;

      switch (code) {
        case "ArrowLeft":
          goToPrevPage();
          break;
        case "ArrowRight":
          goToNextPage();
          break;
        case "Space":
          event.preventDefault();
          event.stopPropagation();
          togglePlay();
          break;
        default:
          break;
      }
    };

    setScale(calculateScale());

    if (fullscreen) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line
  }, [fullscreen]);

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

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      updateContainerWidth();
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [updateContainerWidth]);

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
  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
      style={{ maxWidth: "100%" }}
    >
      <Document
        onLoadSuccess={onDocumentLoadSuccess}
        file={fileObj}
        onLoadError={console.error}
        className={`${styles.document} ${
          layoutMode === "double" && styles.documentFlex
        }`}
        error={
          <div className={styles.errorFallback}>Failed to load PDF file</div>
        }
        loading={<Skeleton style={{ aspectRatio: 3.2 }} />}
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

      {numPages && (
        <div
          className={`${styles.controlPanel} ${
            showControls ? styles.active : ""
          }`}
        >
          <div className={styles.controlsContainer}>
            <button onClick={togglePlay} className={styles.playPauseBtn}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div className={styles.pages}>
              <button onClick={goToPrevPage} disabled={pageNumber === 1}>
                <ArrowLeftIcon />
              </button>
              <span className={styles.pagesInfo}>
                {pageNumber} / {numPages}
              </span>
              <button onClick={goToNextPage}>
                <ArrowLeftIcon style={{ transform: "rotate(180deg)" }} />
              </button>
            </div>
          </div>
          <button onClick={toggleFullscreen}>
            <FullscreenIcon />
          </button>
        </div>
      )}
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.pdf === nextProps.pdf;
}

export default React.memo(PDFReader, areEqual);
