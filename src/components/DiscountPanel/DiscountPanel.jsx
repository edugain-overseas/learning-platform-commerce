import { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { ReactComponent as InfoIcon } from "../../images/icons/info.svg";
import { ReactComponent as CloseIcon } from "../../images/icons/cross.svg";
import useLocalStorage from "../../hooks/useLocalStorage";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import styles from "./DiscountPanel.module.scss";

const DiscountPanel = () => {
  const [status, setStatus] = useLocalStorage("category-discount-message", {
    show: true,
    lastHideAt: null,
  });

  const handleHide = () => {
    setStatus({
      show: false,
      lastHideAt: moment.utc().format(),
    });
  };

  useEffect(() => {
    if (status?.show === false && status?.lastHideAt) {
      const lastHide = moment.utc(status.lastHideAt);
      const now = moment.utc();

      const hoursPassed = now.diff(lastHide, "hours");

      if (hoursPassed >= 4) {
        setStatus({
          show: true,
          lastHideAt: null,
        });
      }
    }
  }, [status, setStatus]);

  if (!status?.show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <InfoIcon />
        <div className={styles.graphicElContainer}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>
          <strong>Your Discount</strong> Is Guaranteed - Across All Categories
        </h4>
      </div>

      <div className={styles.btnsContainer}>
        <Link to="/instructions/general/12">Read More</Link>
        <InsetBtn
          icon={<CloseIcon className={styles.closeIcon} />}
          onClick={handleHide}
        />
      </div>
    </div>
  );
};

export default DiscountPanel;
