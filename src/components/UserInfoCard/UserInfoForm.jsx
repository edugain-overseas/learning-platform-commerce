import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCode } from "country-list";
import PhoneInput from "react-phone-input-2";
import { ReactComponent as ReloadIcon } from "../../images/icons/reload.svg";
import { ReactComponent as SaveIcon } from "../../images/icons/save.svg";
import { resetPassword } from "../../http/services/user";
import Tooltip from "../shared/Tooltip/Tooltip";
import CommonButton from "../shared/CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import "react-phone-input-2/lib/style.css";
import styles from "./UserInfoCard.module.scss";
import moment from "moment";

const UserInfoForm = ({
  userInfo,
  changedName,
  changedSurname,
  onSubmit,
  closeEdit,
  passwordChangedAt,
}) => {
  const countryWrapperRef = useRef(null);
  const navigate = useNavigate();
  const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm({
    defaultValues: userInfo,
  });

  useEffect(() => {
    reset(userInfo);
  }, [userInfo, reset]);

  const handleCancel = (e) => {
    e.preventDefault();
    reset(userInfo);
    closeEdit();
  };

  const handlePhoneChange = (value, countryData) => {
    setValue("phone", value, { shouldDirty: true });

    if ((watch("country") && dirtyFields.country) || userInfo.country) return;

    setValue("country", countryData.name, { shouldDirty: false });

    if (countryWrapperRef.current) {
      countryWrapperRef.current.querySelector(".flag").className =
        "flag " + countryData.countryCode;
    }
  };

  const handleCountryChange = (value, countryData) => {
    setValue("country", countryData.name, { shouldDirty: true });

    if ((watch("phone") && dirtyFields.phone) || userInfo.phone) return;

    setValue("phone", value, { shouldDirty: false });
  };

  const handleNavigateToChangePassword = async () => {
    if (userInfo.email) {
      setIsChangePasswordLoading(true);
      try {
        const response = await resetPassword(userInfo.email);
        setIsChangePasswordLoading(false);
        const message = response.data.message;
        if (response.status === 200) {
          navigate("/login", {
            state: {
              paswordRecovery: true,
              email: userInfo.email,
              message: {
                type: "success",
                content: `${message} ${userInfo.email}`,
              },
            },
          });
        }
      } catch (error) {
        console.log(error);
        setIsChangePasswordLoading(false);
      } finally {
      }
    }
  };

  const handleFormSubmit = async (data) => {
    const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    if (Object.keys(changedData).length > 0) {
      const error = await onSubmit(changedData);
      if (error) {
        setError(error.name, { message: error.message });
      }
    } else {
      closeEdit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.userInfoForm}
    >
      <div className={styles.formGrid}>
        <label className={styles.blockLabel}>
          <span>Username:</span>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            style={{
              border: errors.username
                ? "1rem solid var(--bg-button-failture)"
                : "none",
            }}
          />
          {errors.username && (
            <span className={styles.error}>{errors.username.message}</span>
          )}
        </label>

        <label>
          <span>First Name:</span>
          <Tooltip
            orientation="bottom"
            infoContent="You can change your first name just once!"
            popupMaxWidth="100%"
          >
            <input type="text" {...register("name")} readOnly={changedName} />
          </Tooltip>
        </label>

        <label>
          <span>Last Name:</span>
          <Tooltip
            orientation="bottom"
            infoContent="You can change your last name just once!"
            popupMaxWidth="100%"
          >
            <input
              type="text"
              {...register("surname")}
              readOnly={changedSurname}
            />
          </Tooltip>
        </label>

        <label className={styles.blockLabel}>
          <span>Email:</span>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            style={{
              border: errors.email
                ? "1rem solid var(--bg-button-failture)"
                : "none",
            }}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </label>
        <label>
          <span>Phone number:</span>
          <PhoneInput
            containerClass={styles.phoneContainer}
            inputClass={styles.phoneInput}
            buttonClass={styles.phoneBtn}
            dropdownClass={styles.phoneDropDown}
            country={"us"}
            value={watch("phone")}
            onChange={handlePhoneChange}
          />
        </label>

        <label>
          <span>Your country:</span>
          <div className={styles.countryWrapper} ref={countryWrapperRef}>
            <PhoneInput
              containerClass={styles.phoneContainer}
              inputClass={styles.phoneInput}
              buttonClass={styles.phoneBtn}
              dropdownClass={styles.countryDropDown}
              placeholder="Select country"
              onChange={handleCountryChange}
              autoFormat={false}
              disableCountryCode={true}
              enableSearch={true}
              prefix=""
              autocompleteSearch={true}
              disableSearchIcon={true}
              inputProps={{ type: "hidden" }}
              country={getCode(userInfo.country)?.toLowerCase()}
            />
            <input
              type="text"
              value={watch("country")}
              onChange={() => {}}
              className={styles.countryInput}
              placeholder="Your country"
              disabled={true}
            />
          </div>
        </label>

        <div className={styles.changePasswordWrapper}>
          <p>Last changed:</p>
          <p>
            {passwordChangedAt
              ? moment
                  .utc(passwordChangedAt)
                  .local()
                  .format("DD.MM.YYYY [at] HH:mm")
              : "No data"}
          </p>
        </div>
        <CommonButton
          type="button"
          className={styles.changePasswordButton}
          text="Change password"
          icon={
            isChangePasswordLoading && <Spinner size={4} contrastColor={true} />
          }
          variant="transparentTextDark"
          onClick={handleNavigateToChangePassword}
        />
      </div>

      <div className={styles.btnsWrapper}>
        <button onClick={handleCancel} type="button">
          <span>Cancel</span>
          <ReloadIcon />
        </button>
        <button type="submit" disabled={isSubmitting}>
          <span>Save</span>
          <SaveIcon />
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
