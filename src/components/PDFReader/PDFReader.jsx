import { ReactComponent as ArrowLeftIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";

import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./PDFReader.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  withCredentials: true,
};

const PDFReader = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  // const [displayAlbum, setDisplayAlbum] = useState(false);

  // eslint-disable-next-line
  const [fileObj, setFileObj] = useState({ url: pdf });

  console.log(pageHeight, fullscreen, setFileObj);

  const containerRef = useRef(null);
  const controlPanelRef = useRef(null);
  const interval = useRef(null);
  const mouseMoveTimeoutId = useRef(null);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageLoadSuccess = (info) => {
    setPageLoadedSucces(true);
    setPageHeight(info.height);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (pageNumber === 1) {
      return;
    }
    setPageNumber((prev) => prev - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();

    setPageNumber((prev) => {
      if (prev === numPages) return 1;
      return prev + 1;
    });
  };

  const handleContainerMouseEnter = () => {
    setShowControls(true);
  };
  const handleContainerMouseLeave = () => {
    setShowControls(false);
  };

  const handlePlay = (e) => {
    e.stopPropagation();

    if (playing && interval.current) {
      window.clearInterval(interval.current);
    } else {
      interval.current = window.setInterval(
        () =>
          setPageNumber((prev) => {
            if (prev === numPages) return 1;
            return prev + 1;
          }),
        5000
      );
    }
    setPlaying((prev) => !prev);
  };

  const handleContainerMouseMove = () => {    
    clearTimeout(mouseMoveTimeoutId.current);
    setShowControls(true);
    mouseMoveTimeoutId.current = setTimeout(() => setShowControls(false), 1000);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();

    if (document.fullscreenElement === null) {
      containerRef.current?.requestFullscreen();
      containerRef.current?.addEventListener(
        "mousemove",
        handleContainerMouseMove
      );
    } else {
      document.exitFullscreen();
      containerRef.current?.removeEventListener(
        "mousemove",
        handleContainerMouseMove
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      style={{
        height: "100%",
      }}
    >
      {pageLoadedSucces && (
        <div
          className={`${styles.controlPanel} ${
            showControls ? styles.active : ""
          }`}
          ref={controlPanelRef}
        >
          <div className={styles.controlsCenter}>
            <button onClick={handlePrev} className={styles.controlPrevBtn}>
              <ArrowLeftIcon />
            </button>
            <button className={styles.controlPlayBtn} onClick={handlePlay}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={handleNext} className={styles.controlNextBtn}>
              <ArrowLeftIcon />
            </button>
          </div>
          <div className={styles.controlsBottom}>
            <p className={styles.pagesInfo}>{`${pageNumber} / ${numPages}`}</p>
            <button
              className={styles.controllsFullscreenOn}
              onClick={handleFullscreen}
            >
              <FullscreenIcon />
            </button>
          </div>
        </div>
      )}
      <Document
        file={fileObj}
        options={options}
        onLoadSuccess={onLoadSuccess}
        onLoadError={console.error}
        className={styles.document}
        loading={null}
      >
        {containerRef.current && (
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            // width={fullscreen ? undefined : containerRef.current?.clientWidth}
            // height={fullscreen ? containerRef.current?.clientHeight : undefined}
            height={containerRef.current?.clientHeight}
            loading={null}
            onLoadSuccess={handlePageLoadSuccess}
          />
        )}
      </Document>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  return prevProps.pdf === nextProps.pdf;
}

export default React.memo(PDFReader, areEqual);
