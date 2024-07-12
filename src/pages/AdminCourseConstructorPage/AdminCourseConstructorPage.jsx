import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { ReactComponent as LaptopIcon } from "../../images/icons/laptop.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as SchoolOnlineIcon } from "../../images/icons/courseIcons/school-online.svg";
import { ReactComponent as ClockDarkIcon } from "../../images/icons/courseIcons/clock-dark.svg";
import { ReactComponent as CertificateIcon } from "../../images/icons/courseIcons/certificate.svg";
import { priceFormatter } from "../../utils/priceFormatter";
import devices from "../../images/devices.png";
import Textarea from "../../components/shared/Textarea/Textarea";
import ImageUploader from "../../components/shared/Uploaders/ImageUploader/ImageUploader";
import CategoryPicker from "../../components/CategoryPicker/CategoryPicker";
import styles from "./AdminCourseConstructorPage.module.scss";

const AdminCourseConstructorPage = ({ courseData }) => {
  const { courseId } = useParams();
  const [imagePath, setImagePath] = useState(courseData?.image_path);
  const [categoryId, setCategoryId] = useState(courseData?.category_id || "");

  console.log(courseData);

  const { register, handleSubmit } = useForm({
    defaultValues: courseData
      ? {
          title: courseData.title,
          intro_text: courseData.intro_text,
          about_text: courseData.about_text,
          price: priceFormatter(courseData.price),
          old_price: priceFormatter(courseData.old_price),
          c_type: courseData.c_type,
          c_duration: courseData.c_duration,
          c_access: courseData.c_access,
          c_award: courseData.c_award,
          c_language: courseData.c_language,
          c_level: courseData.c_level,
        }
      : {},
  });

  const registerWithMask = useHookFormMask(register);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={`${styles.wrapper} ${!courseId ? styles.pageWrapper : ""}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.mainInfoWrapper}>
          <div className={styles.textContentWrapper}>
            <div className={styles.courseName}>
              <Textarea
                placeholder="Course title"
                fontSize={24}
                maxRows={2}
                setMinRowsonBlur={true}
                minRows={1}
                {...register("title")}
              />
            </div>

            <div className={styles.courseAbout}>
              <Textarea
                placeholder="Course main information"
                minRows={4}
                maxRows={8}
                {...register("intro_text")}
              />
            </div>
            <div className={styles.listWrapper}>
              <h4 className={styles.listTitle}>Skills you will learn:</h4>
              <ul className={styles.listItems}>
                <li className={styles.listItem}>
                  Understanding essential economic principles and concepts;
                </li>
                <li className={styles.listItem}>
                  Analyzing the production and consumption of goods and
                  services;
                </li>
                <li className={styles.listItem}>
                  Evaluation of international business strategies.
                </li>
              </ul>
            </div>
            <p className={styles.programInfo}>
              This course is part of the <u>Mini-MBA</u> and{" "}
              <u>Global Governance</u> programs.
            </p>
          </div>
          <div className={styles.visualContentWrapper}>
            <div className={styles.posterWrapper}>
              <ImageUploader
                uploadedImage={imagePath}
                setUploadedImage={setImagePath}
              />
            </div>
          </div>
        </div>

        <div className={styles.mainInfoWrapper}>
          <div className={styles.courseItemsWrapper}>
            <ul className={styles.courseItems}>
              <li>
                <span className={styles.property}>
                  <LaptopIcon />
                  Type:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="Online course"
                  className={styles.value}
                  {...register("c_type")}
                />
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Duration:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="3 hours (self-praced)"
                  {...register("c_duration")}
                />
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Award:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="Certificate"
                  {...register("c_award")}
                />
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Language:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="Full audio & text"
                  {...register("c_language")}
                />
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Level:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="Introductory"
                  {...register("c_level")}
                />
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Access:
                </span>
                <Textarea
                  maxRows={1}
                  placeholder="Lifetime access"
                  {...register("c_access")}
                />
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${styles.mainInfoWrapper} ${styles.categoryPriceInfoWrapper}`}
        >
          <div className={styles.categoryWrapper}>
            <CategoryPicker value={categoryId} setValue={setCategoryId} />
          </div>
          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              <span>Price:</span>
              <input
                type="text"
                {...registerWithMask("price", ["9.99", "99.99", "999.99"], {
                  required: true,
                })}
              />
            </div>
            <div className={styles.price}>
              <span>Old price:</span>
              <input
                type="text"
                {...registerWithMask("old_price", ["9.99", "99.99", "999.99"], {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>

        <div className={styles.mainInfoWrapper}>
          <div className={styles.textContentWrapper}>
            <h2 className={styles.courseName}>About this course</h2>
            <div className={styles.textInfo}>
              <Textarea minRows={10} maxRows={20} {...register("about_text")} />
            </div>
            <ul className={styles.advantagesList}>
              <li>
                <SchoolOnlineIcon />
                <h4>100% Online</h4>
                <p>Click through engaging and award winning course content.</p>
              </li>
              <li>
                <ClockDarkIcon />
                <h4>100% self-paced</h4>
                <p>
                  Immediate start: study when, where, and how fast you want.
                </p>
              </li>
              <li>
                <CertificateIcon />
                <h4>Get your certificate</h4>
                <p>
                  Download your personal certificate upon completion of this
                  course.
                </p>
              </li>
            </ul>
          </div>
          <div className={`${styles.visualContentWrapper} ${styles.devices}`}>
            <img src={devices} alt="devices" />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminCourseConstructorPage;
