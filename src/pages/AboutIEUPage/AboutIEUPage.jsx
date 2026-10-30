import React from "react";
import textIcon from "../../images/textIcon.png";
import styles from "./AboutIEUPage.module.scss";
import { Link } from "react-router-dom";

const AboutIEUPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textBlock}>
        <h2 className={styles.mainTitle}>About FEU</h2>
        <div className={styles.textWithIconWrapper}>
          <img src={textIcon} alt="student" />
          <p className={`${styles.text} ${styles.textWithIcon}`}>
            FEU Online Courses is the online learning platform of{" "}
            <b>First European University</b>, bringing the University's
            commitment to education into a flexible digital format. Through
            affordable courses that combine lectures, tests, and certificates of
            completion, the platform creates opportunities to explore new
            subjects, strengthen existing knowledge, and pursue personal and
            professional development. It extends FEU's educational mission to
            learners who wish to study independently and fit education around
            their everyday responsibilities.
          </p>
        </div>
      </div>
      {/* <div className={styles.textBlock}>
        <h3 className={styles.secondaryTitle}>Our Mission</h3>
        <p className={styles.text}>
          Provide international students of the 
          <b>First European University</b> in Malta with the best facilities,
          knowledge, technologies, and internships in Malta to make the world a
          better place for everyone. IEU, Malta Campus’s student community is an
          active participant. Student community is an active participant.
        </p>
      </div> */}
      <div className={styles.textBlock}>
        <p className={styles.text}>
          First European University promotes a contemporary approach to
          education, combining the established strengths of Ukrainian higher
          education with European and international academic practices.{" "}
          <b>
            FEU Online Courses reflects this educational outlook by making
            structured learning available through the website and mobile
            application
          </b>
          . The platform provides an additional way to engage with FEU's
          educational community, whether learners are continuing their studies,
          refreshing their knowledge, or discovering a subject for the first
          time.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          The University's academic philosophy places emphasis on strong
          foundations, contemporary teaching methods, and knowledge relevant to
          professional practice. These principles also inform the purpose of FEU
          Online Courses: to help students develop their understanding through
          organised study and assessment.{" "}
          <b>
            Lectures, supporting materials, tests, and a final exam form a
            connected learning process
          </b>
          , allowing students to build their knowledge and evaluate their
          progress throughout a course.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          As part of First European University's wider educational offering, the
          platform supports learning beyond traditional degree programmes.
          Online courses give learners the opportunity to focus on a particular
          subject without committing to a full programme of higher education.
          For current students, they can supplement existing studies; for
          graduates and working professionals, they offer a way to revisit
          familiar topics or explore areas relevant to changing interests and
          responsibilities.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          <b>
            Student-centred learning is an important element of FEU's academic
            philosophy
          </b>
          , and flexibility is central to the online course experience. Students
          can access their purchased courses through the website or mobile
          application using the same account. Once a course has been purchased,
          learners have unlimited time to complete the required activities and
          earn their certificate, allowing them to organise their studies around
          work, family, and other commitments.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          The course catalogue helps students choose according to their
          interests, learning goals, and available study time. Before purchasing
          a course, learners can review its description, topics, lecture
          content, duration, and fee. Both shorter and longer courses are
          available, providing different levels of engagement with a subject.
          Depending on the course, materials may include written lectures,
          videos, presentations, and downloadable resources.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          The platform combines independent study with a clear assessment
          structure. Tests allow students to check their understanding, review
          previous answers, and identify material that requires further
          attention. Available retake opportunities help learners improve their
          results in accordance with the course rules, while the final exam
          completes the assessment process.{" "}
          <b>
            This emphasis on studying and demonstrating understanding reflects
            the platform's educational purpose within FEU's broader activities
          </b>
          .
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          After successfully completing the required activities and passing the
          final exam, students receive a{" "}
          <b>certificate of completion for their FEU online course</b>. Learners
          can download it from the platform and receive a copy by email. The
          certificate provides a record of the course they have completed and
          the learning undertaken through the platform.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          Access to learning continues after the course has finished. Students
          can return to completed course materials to revise topics and refresh
          their knowledge, continue with other purchased courses, or explore
          further subjects in the catalogue.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          A support team is available by email and through the platform to
          assist with registration, payments, course access, assessments, and
          certificates.
        </p>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          Through FEU Online Courses,{" "}
          <b>
            First European University extends its commitment to continued
            education and makes learning accessible beyond the physical
            classroom
          </b>
          . The platform connects the University's educational values with the
          convenience of online study, giving learners a practical way to
          continue developing their knowledge at different stages of their
          academic and professional lives.
        </p>
      </div>
      <div className={styles.textBlock}>
        <div className={styles.linksWrapper}>
          <Link to="/courses/all">
            <span>View All Courses</span>
          </Link>
          <a href="https://feu.com.ua/" target="_blank" rel="noreferrer">
            <span>Visit University Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutIEUPage;
