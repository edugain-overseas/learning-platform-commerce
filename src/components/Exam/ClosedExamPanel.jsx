import React, { useState } from "react";
import ExamStat from "./ExamStat";
import styles from "./Exam.module.scss";
import Modal from "../shared/Modal/Modal";
import ChangeNameForm from "./ChangeNameForm";
import { getUserInfo } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import DownloadCertificate from "./DownloadCertificate";

const content = {
  firstAttempt: {
    title: "Welcome to Your Final Step!",
    topInfo: (
      <>
        <p className={styles.mainInfo}>
          Congratulations on reaching the final stage of your course! This exam
          is your last step before earning your certificate, a recognition of
          your hard work and dedication to advancing your business knowledge.
        </p>
        <p className={styles.additionInfo}>
          Before you begin, here are a few important points: Review Your
          Progress:
        </p>
        <p className={styles.mainInfo}>
          Review Your Progress: Below, you'll find a summary of your previous
          achievements and progress throughout the course. Take pride in how far
          you've come!
        </p>
      </>
    ),
    bottomInfo: (
      <>
        <p className={styles.mainInfo}>
          <b>Focus and Stay Present</b>: During the exam, it’s essential to
          remain on this page. If you close it or navigate to another window,
          the exam will automatically end, and only the answers submitted so far
          will be recorded.
        </p>
        <p className={styles.mainInfo}>
          <b>Stay Confident</b>: Trust in the knowledge you’ve gained. You've
          prepared well, and we’re rooting for your success! Take a deep breath,
          stay focused, and give it your best. We wish you the very best of luck
          — you're just one step away from achieving your goal!
        </p>
      </>
    ),
  },
  maxScored: {
    title: "Congratulations on Your Outstanding Achievement!",
    topInfo: (
      <>
        <p className={styles.mainInfo}>
          You’ve achieved an exceptional score of points, the highest possible
          mark! This outstanding result reflects your dedication, perseverance,
          and mastery of the course material.
        </p>
        <p className={styles.additionInfo}>
          We are honored to celebrate your success!
        </p>
      </>
    ),
    bottomInfo: (
      <>
        <p className={styles.mainInfo}>
          Click the button below to <b>complete your course</b> to get your
          well-deserved recognition: Download Your Certificate. After it your
          Certificate will be ready to download.
        </p>
        <p className={styles.mainInfo}>
          But why stop here? Unlock even more opportunities for growth and
          success with our wide range of business courses. Explore new topics,
          sharpen your skills, and continue your learning journey today!
        </p>
      </>
    ),
  },
  passed: {
    title: "Well Done on Completing the Exam!",
    topInfo: (
      <>
        <p className={styles.mainInfo}>
          Well Done on Completing the Exam! You’ve earned good number of points,
          an impressive score that reflects your hard work and understanding of
          the material. Great job!
        </p>
        <p className={styles.mainInfo}>
          If you’d like to aim even higher, you have the opportunity to retake
          the exam and improve your score. Remember, every step toward mastery
          is a step toward success!
        </p>
      </>
    ),
    bottomInfo: (
      <>
        <p className={styles.mainInfo}>
          Ready to finalize your achievement?
          <br /> If you’re satisfied with your score, confirm your{" "}
          <b>completion of the course</b> and download your certificate of
          accomplishment: Finish Course and Download Certificate
        </p>
        <p className={styles.mainInfo}>
          Your journey doesn’t end here. Broaden your knowledge, sharpen your
          skills, and unlock new opportunities with our diverse range of
          business courses. There’s so much more to explore!
        </p>
      </>
    ),
  },
  failed: {
    title: "Keep Going — You’re on the Path to Success!",
    topInfo: (
      <>
        <p className={styles.mainInfo}>
          You’ve scored points, which shows a solid effort and potential for
          improvement.
        </p>
        <p className={styles.mainInfo}>
          Don’t be discouraged—every attempt is a step closer to mastery!
        </p>
      </>
    ),
    bottomInfo: (
      <>
        <p className={styles.mainInfo}>
          You can retake the exam to improve your score and unlock your
          certificate. Take this opportunity to review the material and give it
          another try: <br />
          [Retake Exam]
        </p>
        <p className={styles.mainInfo}>
          We’re here to support your journey and help you succeed. Remember,
          growth comes with persistence and learning from every experience!
          <br />
          Looking for more opportunities to expand your skills? Explore our wide
          range of business courses and discover topics that inspire you to
          reach new heights.
        </p>
        <p className={styles.mainInfo}>
          Thank you for your hard work and determination. We believe in your
          potential and can’t wait to celebrate your success!
        </p>
      </>
    ),
  },
};

const ClosedExamPanel = ({
  examData,
  isCompleted,
  stats,
  handleStartExam,
  handleCompleteCourse,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector(getUserInfo);
  const requestForUserChangeName = !userInfo.changedName;
  const requestForUserChangeSurname = !userInfo.changedSurname;
  const name = userInfo.name;
  const surname = userInfo.surname;
  const studentAttempts = examData.attempts_data;

  console.log(userInfo);

  const handleCompleteCourseBtnClick = async () => {
    if (requestForUserChangeName || requestForUserChangeSurname) {
      setIsOpenModal(true);
      return;
    }
    setIsLoading(true);
    try {
      await handleCompleteCourse();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = async () => {
    setIsOpenModal(false);
    setIsLoading(true);
    try {
      await handleCompleteCourse();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderButtons = () => {
    const downloadCertificate = <DownloadCertificate />;

    const completeExam = (
      <button
        className={styles.primaryBtn}
        onClick={handleCompleteCourseBtnClick}
      >
        {isLoading ? <Spinner /> : <span>Complete your course</span>}
      </button>
    );

    const startAttempt = (
      <button
        className={styles.primaryBtn}
        onClick={handleStartExam}
        disabled={!(examData.attempts - studentAttempts?.length)}
      >
        <span>Start the exam</span>
      </button>
    );

    const retakeExam = (
      <button
        className={styles.secondaryBtn}
        onClick={handleStartExam}
        disabled={!(examData.attempts - studentAttempts?.length)}
      >
        <span>Retake exam</span>
      </button>
    );

    if (isCompleted) {
      return downloadCertificate;
    } else {
      switch (stats.status) {
        case "firstAttempt":
          return startAttempt;
        case "maxScored":
          return completeExam;
        case "passed":
          return (
            <>
              {examData.attempts - studentAttempts?.length !== 0 && retakeExam}
              {completeExam}
            </>
          );
        case "failed":
          return examData.attempts - studentAttempts?.length !== 0
            ? retakeExam
            : null;
        default:
          return null;
      }
    }
  };

  const statsToDisplay =
    stats.status === "firstAttempt"
      ? ["totalPoints", "totalTime", "attemptsAmount", "testsScore"]
      : ["scoredPoints", "spentTime", "finalScore"];

  return (
    <>
      <div className={styles.closedExamPanel}>
        <h3 className={styles.title}>{content[stats.status].title}</h3>
        <div className={styles.topInfoWrapper}>
          {content[stats.status].topInfo}
        </div>
        <ul className={styles.statsWrapper}>
          {statsToDisplay.map((stat) => (
            <li key={stat}>
              <ExamStat statName={stat} statsData={stats.stats} />
            </li>
          ))}
        </ul>
        <div className={styles.bottomInfoWrapper}>
          {content[stats.status].bottomInfo}
        </div>
        <div className={styles.btnsWrapper}>{renderButtons()}</div>
      </div>
      {(requestForUserChangeName || requestForUserChangeSurname) && (
        <Modal
          closeModal={handleCloseModal}
          width="965rem"
          isOpen={isOpenModal}
        >
          <ChangeNameForm
            requestForUserChangeName={requestForUserChangeName}
            requestForUserChangeSurname={requestForUserChangeSurname}
            name={name}
            surname={surname}
            afterSumbit={handleCloseModal}
          />
        </Modal>
      )}
    </>
  );
};

export default ClosedExamPanel;
