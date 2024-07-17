// import React, { useEffect, useRef, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
import { ReactComponent as ArrowLeftIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as PlayIcon } from "../../images/icons/play.svg";
import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
// import { ReactComponent as PrevIcon } from "../../images/icons/prev.svg";
// import { ReactComponent as NextIcon } from "../../images/icons/next.svg";
// import styles from "./PDFReader.module.scss";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
//   withCredentials: true,
// };

// function PDFReader({ pdf, setFullscreen, fullscreen }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageLoadedSucces, setPageLoadedSucces] = useState(false);
//   const [play, setPlay] = useState(false);
//   const [pageHeight, setPageHeight] = useState(0);

//   // eslint-disable-next-line
//   const [fileObj, setFileObj] = useState({ url: pdf });

//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const interval = useRef(null);
//   const controlPanelRef = useRef(null);
//   const PrevBtnRef = useRef(null);
//   const NextBtnRef = useRef(null);

//   const rootFontSize = parseFloat(document.documentElement.style.fontSize);
//   const pageWidthInRem = 423;
//   const pageWidthInPx = pageWidthInRem * rootFontSize;
//   const fullscreenHeight = window.window.outerHeight * 0.85;

//   const onLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handlePageLoadSuccess = (info) => {
//     setPageLoadedSucces(true);
//     setPageHeight(info.height);
//   };

//   const handlePrev = () => {
//     if (pageNumber === 1) {
//       return;
//     }
//     setPageNumber((prev) => prev - 2);
//   };

//   const handleNext = () => {
//     if (pageNumber === numPages) {
//       setPageNumber(1);
//       return;
//     }
//     setPageNumber((prev) => prev + 2);
//   };

//   const handleContainerMouseEnter = () => {
//     if (controlPanelRef.current) {
//       controlPanelRef.current.classList.add(styles.active);
//     }
//     if (PrevBtnRef.current) {
//       PrevBtnRef.current.classList.add(styles.active);
//     }
//     if (NextBtnRef.current) {
//       NextBtnRef.current.classList.add(styles.active);
//     }
//   };

//   useEffect(() => {
//     if (play) {
//       interval.current = setInterval(() => {
//         setPageNumber((prev) => prev + 2);
//       }, 5000);
//     } else {
//       clearInterval(interval.current);
//     }
//   }, [play]);

//   useEffect(() => {
//     if (pageNumber >= numPages) {
//       setPageNumber(1);
//     }
//   }, [pageNumber, numPages]);

//   return (
//     <div
//       ref={containerRef}
//       className={styles.documentContainer}
//       onMouseEnter={handleContainerMouseEnter}
//       style={{ minHeight: pageLoadedSucces ? pageHeight : "auto" }}
//     >
//       {pageLoadedSucces && (
//         <>
//           <div className={styles.controlPanel} ref={controlPanelRef}>
//             <div className={styles.controlsLeft}>
//               <button
//                 className={styles.controlPlayBtn}
//                 onClick={() => setPlay((prev) => !prev)}
//               >
//                 {play ? <PauseIcon /> : <PlayIcon />}
//               </button>
//               <button onClick={handlePrev} className={styles.controlPrevBtn}>
//                 <ArrowLeftIcon />
//               </button>
//               <p
//                 className={styles.pagesInfo}
//               >{`${pageNumber} / ${numPages}`}</p>
//               <button onClick={handleNext} className={styles.controlNextBtn}>
//                 <ArrowLeftIcon />
//               </button>
//             </div>
//             <div className={styles.controlsRight}>
//               <button
//                 className={styles.controllsFullscreenOn}
//                 onClick={() => setFullscreen((prev) => !prev)}
//               >
//                 <FullscreenIcon />
//               </button>
//             </div>
//           </div>
//           <button
//             className={styles.prevBtnLarge}
//             onClick={handlePrev}
//             ref={PrevBtnRef}
//           >
//             <PrevIcon />
//           </button>
//           <button
//             className={styles.nextBtnLarge}
//             onClick={handleNext}
//             ref={NextBtnRef}
//           >
//             <NextIcon />
//           </button>
//         </>
//       )}
//       <Document
//         file={fileObj}
//         options={options}
//         onLoadSuccess={onLoadSuccess}
//         onLoadError={console.error}
//         className={styles.document}
//         loading={null}
//       >
//         <Page
//           pageNumber={pageNumber}
//           renderAnnotationLayer={false}
//           renderTextLayer={false}
//           className={styles.page}
//           width={fullscreen ? null : pageWidthInPx}
//           height={fullscreen ? fullscreenHeight : null}
//           loading={null}
//           onLoadSuccess={handlePageLoadSuccess}
//         />
//         {pageNumber !== numPages && (
//           <Page
//             pageNumber={pageNumber + 1}
//             renderAnnotationLayer={false}
//             renderTextLayer={false}
//             className={styles.page}
//             width={fullscreen ? null : pageWidthInPx}
//             height={fullscreen ? fullscreenHeight : null}
//             canvasRef={canvasRef}
//             loading={null}
//             onLoadSuccess={() => setPageLoadedSucces(true)}
//           />
//         )}
//       </Document>
//     </div>
//   );
// }

// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.pdf === nextProps.pdf &&
//     prevProps.fullscreen === nextProps.fullscreen
//   );
// }

// export default React.memo(PDFReader, areEqual);

import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import ArrowLeftIcon from "../../assets/icons/chevron.svg";
// import PlayIcon from "../../assets/icons/player/play.svg";
// import PauseIcon from "../../assets/icons/player/pause.svg";
// import EnterFullscreenIcon from "../../assets/icons/player/fullscreen.svg";
// import ExitFullscreenIcon from "../../assets/icons/player/fullscreen-exit.svg";
// import { ReactComponent as PauseIcon } from "../../images/icons/pause.svg";
// import { ReactComponent as FullscreenIcon } from "../../images/icons/fullscreen.svg";
// import { ReactComponent as PrevIcon } from "../../images/icons/prev.svg";
// import { ReactComponent as NextIcon } from "../../images/icons/next.svg";
// import { IonIcon } from "@ionic/react";
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
  const [showControls, setShowControls] = useState(true);
  const [pageHeight, setPageHeight] = useState(0);
  // const [displayAlbum, setDisplayAlbum] = useState(false);

  // eslint-disable-next-line
  const [fileObj, setFileObj] = useState({ url: pdf });

  console.log(pageHeight, fullscreen);

  const containerRef = useRef(null);
  const interval = useRef(null);
  const controlPanelRef = useRef(null);

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
    // setDisplayAlbum(info.height > info.width);
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

  const handleContainerClick = () => {
    setShowControls((prev) => !prev);
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

  const handleFullscreen = (e) => {
    e.stopPropagation();

    if (document.fullscreenElement === null) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.documentContainer}
      onClick={handleContainerClick}
      style={{
        // minHeight: pageLoadedSucces ? pageHeight : "auto",
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
