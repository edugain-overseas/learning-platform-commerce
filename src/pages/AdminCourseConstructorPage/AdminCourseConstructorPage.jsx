import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseThunk,
  updateCourseThunk,
} from "../../redux/course/operations";
import { getIsLoading } from "../../redux/course/selectors";
import { ReactComponent as LaptopIcon } from "../../images/icons/laptop.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
import { ReactComponent as SchoolOnlineIcon } from "../../images/icons/courseIcons/school-online.svg";
import { ReactComponent as ClockDarkIcon } from "../../images/icons/courseIcons/clock-dark.svg";
import { ReactComponent as CertificateIcon } from "../../images/icons/courseIcons/certificate.svg";
import { priceFormatter } from "../../utils/priceFormatter";
import { stripHtmlTags } from "../../utils/stripHtmlTags";
import {
  courseFieldsMaxLength,
  courseProperties,
} from "../../costants/courseProperties";
import devices from "../../images/devices.webp";
import Textarea from "../../components/shared/Textarea/Textarea";
import CategoryPicker from "../../components/CategoryPicker/CategoryPicker";
import useMessage from "antd/es/message/useMessage";
import FileUploader from "../../components/shared/Uploaders/FileUploader/FileUploader";
import Spinner from "../../components/Spinner/Spinner";
import RichInput from "../../components/shared/RichInput";
import styles from "./AdminCourseConstructorPage.module.scss";

const AdminCourseConstructorPage = ({ courseData }) => {
  const { courseId } = useParams();
  const [imagePath, setImagePath] = useState(courseData?.image_path);
  const [categoryId, setCategoryId] = useState(courseData?.category_id || null);
  const [messageApi, contextHolder] = useMessage();
  const isLoading = useSelector(getIsLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(courseData);
  

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: courseData
      ? {
          title: courseData.title,
          intro_text: courseData.intro_text,
          program_text: courseData.program_text,
          about_main_text: courseData.about_main_text,
          about_text: courseData.about_text,
          skills_text: courseData.skills_text,
          price: priceFormatter(courseData.price),
          old_price: priceFormatter(courseData.old_price),
          quantity_test: courseData.quantity_test,
          c_type: courseData.c_type,
          c_award: courseData.c_award,
          c_language: courseData.c_language,
          c_level: courseData.c_level,
        }
      : {
          program_text: courseProperties.program_text,
          c_type: courseProperties.c_type,
          c_award: courseProperties.c_award,
          c_language: courseProperties.c_language,
          c_level: courseProperties.c_level,
        },
  });
  const watchTitle = watch("title");
  const watchProgramInfo = watch("program_text");
  const watchIntroText = watch("intro_text");
  const watchSkillsText = watch("skills_text");
  const watchAboutText = watch("about_text");
  const watchCType = watch("c_type");
  const watchCLanguage = watch("c_language");
  const watchCLevel = watch("c_level");
  const watchCAward = watch("c_award");
  // const watchCDuration = watch("c_duration");
  // const watchCAccess = watch("c_access");
  const registerWithMask = useHookFormMask(register);

  const onSubmit = (data) => {
    let isManualError = false;

    if (!stripHtmlTags(data.intro_text)) {
      setError("intro_text", {
        type: "required",
        message: "This field is required",
      });
      isManualError = true;
    }
    if (!stripHtmlTags(data.skills_text)) {
      setError("skills_text", {
        type: "required",
        message: "This field is required",
      });
      isManualError = true;
    }
    if (!stripHtmlTags(data.program_text)) {
      setError("program_text", {
        type: "required",
        message: "This field is required",
      });
      isManualError = true;
    }
    if (!stripHtmlTags(data.about_text)) {
      setError("about_text", {
        type: "required",
        message: "This field is required",
      });
      isManualError = true;
    }

    if (!imagePath) {
      messageApi.open({
        type: "error",
        content: "Please select course poster",
        duration: 2.5,
      });
      isManualError = true;
    }
    if (!categoryId) {
      messageApi.open({
        type: "error",
        content: "Please select course category",
        duration: 2.5,
      });
      isManualError = true;
    }

    if (isManualError) return;

    const courseData = {
      ...data,
      category_id: categoryId,
      image_path: imagePath,
    };

    courseData.price = +data.price;
    courseData.old_price = data.old_price === "" ? null : +data.old_price;

    if (courseId) {
      try {
        dispatch(updateCourseThunk({ courseId, courseData }))
          .unwrap()
          .then(() => {
            messageApi.success({
              content: "Course succesfully updated",
              duration: 3,
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        dispatch(createCourseThunk({ data: courseData }))
          .unwrap()
          .then(() => {
            messageApi.success({
              content: "Course has been created",
              duration: 3,
            });
            navigate("/courses");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className={`${styles.wrapper} ${!courseId ? styles.pageWrapper : ""}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.mainInfoWrapper} ${styles.blockWrapper}`}>
            <div className={styles.textContentWrapper}>
              <div className={styles.courseName}>
                <input
                  type="text"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  maxLength={courseFieldsMaxLength.title}
                  placeholder="Course title"
                />
                <span className={styles.maxLength}>{`${
                  watchTitle ? watchTitle.length : 0
                }/${courseFieldsMaxLength.title}`}</span>
                {errors.title && (
                  <p className={styles.error}>{errors.title.message}</p>
                )}
              </div>

              <div className={styles.courseAbout}>
                <RichInput
                  control={control}
                  name="intro_text"
                  placeholder="Course main information"
                  maxLength={courseFieldsMaxLength.intro_text}
                />
                <span className={styles.maxLength}>{`${
                  stripHtmlTags(watchIntroText).length
                }/${courseFieldsMaxLength.intro_text}`}</span>
                {errors.intro_text && (
                  <p className={styles.error}>{errors.intro_text.message}</p>
                )}
              </div>
              <div className={styles.listWrapper}>
                <h4 className={styles.listTitle}>Skills you will learn:</h4>
                <div className={styles.inputWrapper}>
                  <RichInput
                    control={control}
                    name="skills_text"
                    placeholder="Course skills information"
                    maxLength={courseFieldsMaxLength.skills_text}
                  />
                  <span className={styles.maxLength}>{`${
                    stripHtmlTags(watchSkillsText).length
                  }/${courseFieldsMaxLength.skills_text}`}</span>
                  {errors.skills_text && (
                    <p className={styles.error}>{errors.skills_text.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.programInfo}>
                <RichInput
                  control={control}
                  placeholder="Program info"
                  name="program_text"
                  maxLength={courseFieldsMaxLength.program_text}
                />
                {errors.program_text && (
                  <p className={styles.error}>{errors.program_text.message}</p>
                )}
                <span className={styles.maxLength}>{`${
                  stripHtmlTags(watchProgramInfo).length
                }/${courseFieldsMaxLength.program_text}`}</span>
              </div>
            </div>
            <div className={styles.visualContentWrapper}>
              <div className={styles.posterWrapper}>
                <FileUploader
                  type="image"
                  accept="image/*"
                  uploadedFilePath={imagePath}
                  setUploadedFilePath={setImagePath}
                />
              </div>
            </div>
          </div>

          <div className={styles.blockWrapper}>
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
                    maxLength={20}
                    {...register("c_type", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <span className={styles.maxLength}>{`${
                    watchCType.length
                  }/${20}`}</span>
                  {errors.c_type && (
                    <p className={styles.error}>{errors.c_type.message}</p>
                  )}
                </li>
                <li>
                  <span className={styles.property}>
                    <ClockIcon />
                    Award:
                  </span>
                  <Textarea
                    maxRows={1}
                    maxLength={20}
                    placeholder="Certificate"
                    {...register("c_award", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <span className={styles.maxLength}>{`${
                    watchCAward.length
                  }/${20}`}</span>
                  {errors.c_award && (
                    <p className={styles.error}>{errors.c_award.message}</p>
                  )}
                </li>
                <li>
                  <span className={styles.property}>
                    <ClockIcon />
                    Language:
                  </span>
                  <Textarea
                    maxRows={1}
                    maxLength={20}
                    placeholder="Full audio & text"
                    {...register("c_language", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <span className={styles.maxLength}>{`${
                    watchCLanguage.length
                  }/${20}`}</span>
                  {errors.c_language && (
                    <p className={styles.error}>{errors.c_language.message}</p>
                  )}
                </li>
                <li>
                  <span className={styles.property}>
                    <ClockIcon />
                    Level:
                  </span>
                  <Textarea
                    maxRows={1}
                    maxLength={20}
                    placeholder="Introductory"
                    {...register("c_level", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                  />
                  <span className={styles.maxLength}>{`${
                    watchCLevel.length
                  }/${20}`}</span>
                  {errors.c_level && (
                    <p className={styles.error}>{errors.c_level.message}</p>
                  )}
                </li>
                <li>
                  <span className={styles.property}>
                    <ClockIcon />
                    Tests:
                  </span>

                  <input
                    type="text"
                    placeholder="Quantity of tests"
                    {...register("quantity_test", {
                      required: "This field is required",
                      min: { value: 2, message: "Minimum value is 2" },
                      max: { value: 10, message: "Maximum value is 10" },
                      validate: (value) => {
                        if (!Number.isInteger(+value)) {
                          return "Must be an integer";
                        }
                        if ([7, 9].includes(+value)) {
                          return "7 and 9 are not allowed";
                        }
                      },
                    })}
                  />
                  {errors.quantity_test && (
                    <p className={styles.error}>
                      {errors.quantity_test.message}
                    </p>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`${styles.mainInfoWrapper} ${styles.categoryPriceInfoWrapper} ${styles.blockWrapper}`}
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
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <p className={styles.error}>{errors.price.message}</p>
                )}
              </div>
              <div className={styles.price}>
                <span>Old price:</span>
                <input
                  type="text"
                  {...registerWithMask("old_price", [
                    "9.99",
                    "99.99",
                    "999.99",
                  ])}
                />
                {errors.old_price && (
                  <p className={styles.error}>{errors.old_price.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.blockWrapper}>
            <div
              className={`${styles.textContentWrapper} ${styles.aboutMainTextContentWrapper}`}
            >
              <h2 className={styles.courseName}>About this course</h2>
              <div className={styles.mainAboutTextWrapper}>
                <RichInput
                  control={control}
                  name="about_main_text"
                  placeholder="About text"
                />
              </div>
            </div>
            <div
              className={`${styles.mainInfoWrapper} ${styles.aboutInfoWrapper}`}
            >
              <div className={styles.textContentWrapper}>
                <div className={styles.textInfo}>
                  <div className={styles.inputWrapper}>
                    <RichInput
                      control={control}
                      name="about_text"
                      placeholder="Course about text"
                      maxLength={courseFieldsMaxLength.about_text}
                    />
                    <span className={styles.maxLength}>{`${
                      stripHtmlTags(watchAboutText).length
                    }/${courseFieldsMaxLength.about_text}`}</span>
                    {errors.about_text && (
                      <p className={styles.error}>
                        {errors.about_text.message}
                      </p>
                    )}
                  </div>
                </div>
                <ul className={styles.advantagesList}>
                  <li>
                    <SchoolOnlineIcon />
                    <h4>100% Online</h4>
                    <p>
                      Click through engaging and award winning course content.
                    </p>
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
              <div
                className={`${styles.visualContentWrapper} ${styles.devices}`}
              >
                <img src={devices} alt="devices" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`${styles.createCourseBtn} ${
              courseId ? styles.update : ""
            }`}
          >
            <span>{`${courseId ? "Update" : "Create"}`} course</span>
            {isLoading && <Spinner contrastColor={true} />}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminCourseConstructorPage;
