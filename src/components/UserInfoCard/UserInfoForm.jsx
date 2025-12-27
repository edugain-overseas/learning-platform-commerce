import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getCode } from "country-list";
import PhoneInput from "react-phone-input-2";
import { ReactComponent as EyeIcon } from "../../images/icons/eye.svg";
import { ReactComponent as EyeInvisibleIcon } from "../../images/icons/eye-invisible.svg";
import { ReactComponent as ReloadIcon } from "../../images/icons/reload.svg";
import { ReactComponent as SaveIcon } from "../../images/icons/save.svg";
import Tooltip from "../shared/Tooltip/Tooltip";
import styles from "./UserInfoCard.module.scss";
import "react-phone-input-2/lib/style.css";

const UserInfoForm = ({ userInfo, onSubmit, closeEdit }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const countryWrapperRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm({
    defaultValues: userInfo,
  });

  useEffect(() => {
    reset(userInfo);
  }, [userInfo, reset]);

  const handleToggleShowPassword = (e) => {
    e.preventDefault();
    setIsPasswordShown((prev) => !prev);
  };

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

  const handleFormSubmit = (data) => {
    const changedData = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    console.log(changedData);

    if (Object.keys(changedData).length > 0) {
      onSubmit(changedData);
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
            <input type="text" {...register("name")} />
          </Tooltip>
        </label>

        <label>
          <span>Last Name:</span>
          <Tooltip
            orientation="bottom"
            infoContent="You can change your last name just once!"
            popupMaxWidth="100%"
          >
            <input type="text" {...register("surname")} />
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
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </label>

        <label className={`${styles.passwordWrapper} ${styles.blockLabel}`}>
          <span>Password:</span>
          <div className={styles.passwordInputWrapper}>
            <button
              className={styles.toggleShowBtn}
              onClick={handleToggleShowPassword}
            >
              {isPasswordShown ? <EyeIcon /> : <EyeInvisibleIcon />}
            </button>
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="********"
              className={styles.password}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
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
