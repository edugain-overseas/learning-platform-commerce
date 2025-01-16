import React from "react";
import { Link } from "react-router-dom";
import { useSwiper } from "swiper/react";
import { ReactComponent as ArrowIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as PrevIcon } from "../../../images/icons/prev.svg";
import { ReactComponent as NextIcon } from "../../../images/icons/next.svg";
import styles from "../HomePage.module.scss";
import InsetBtn from "../../../components/shared/InsetBtn/InsetBtn";

const SliderSectionHeader = ({ title = null, link }) => {
  const swiper = useSwiper();

  return (
    <div className={styles.sectionHeader}>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.divider}></span>
        <Link to={link}>
          <span>Show all</span>
          <ArrowIcon />
        </Link>
      </div>
      <div className={styles.sliderNavButtons}>
        <InsetBtn
          icon={<PrevIcon className={styles.prev} />}
          width="40rem"
          height="40rem"
          onClick={() => swiper.slidePrev()}
        />
        <InsetBtn
          icon={<NextIcon className={styles.next} />}
          width="40rem"
          height="40rem"
          onClick={() => swiper.slideNext()}
        />
      </div>
    </div>
  );
};

export default SliderSectionHeader;
