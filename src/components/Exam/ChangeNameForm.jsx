import React, { useState } from "react";
import { ReactComponent as SaveIcon } from "../../images/icons/save.svg";
import styles from "./Exam.module.scss";
import Tooltip from "../shared/Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { updateUserInfoThunk } from "../../redux/user/operations";
import Spinner from "../Spinner/Spinner";

const ChangeNameForm = ({
  requestForUserChangeName,
  requestForUserChangeSurname,
  name,
  surname,
  afterSumbit,
}) => {
  const [nameValue, setNameValue] = useState(name);
  const [surnameValue, setSurnameValue] = useState(surname);
  const [messageApi, contextHolder] = useNotificationMessage();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const isSubmitButtonDisabled =
    isLoading || (nameValue === name && surnameValue === surname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    if (nameValue !== name) data.name = nameValue;
    if (surnameValue !== surname) data.surname = surnameValue;

    setIsLoading(true);
    try {
      await dispatch(updateUserInfoThunk(data)).unwrap();
      messageApi.success({
        content: "Your profile was successfully updated",
        duration: 3,
      });
      afterSumbit();
    } catch (error) {
      messageApi.error({
        content: "Something went wrong",
        duration: 3,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <form className={styles.nameForm} onSubmit={handleSubmit}>
        <h4>To continue you need to check your data</h4>
        <p className={styles.primaryText}>
          Please check the spelling of your <b>first and last name</b> before
          continuing, so that there are no errors in the documents that will be
          generated in the future. <b>If everything is correct</b>, just close
          the window.
        </p>
        <div className={styles.fieldsWrapper}>
          {requestForUserChangeName && (
            <label className={styles.fieldWrapper}>
              <span>First Name</span>
              <Tooltip
                orientation="bottom"
                infoContent="You can chage your first name just once!"
                trigger="focus"
                popupMaxWidth="100%"
              >
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </Tooltip>
            </label>
          )}
          {requestForUserChangeSurname && (
            <label className={styles.fieldWrapper}>
              <span>Last Name</span>
              <Tooltip
                orientation="bottom"
                infoContent="You can chage your last name just once!"
                trigger="focus"
                popupMaxWidth="100%"
              >
                <input
                  type="text"
                  value={surnameValue}
                  onChange={(e) => setSurnameValue(e.target.value)}
                />
              </Tooltip>
            </label>
          )}
          <button type="submit" disabled={isSubmitButtonDisabled}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <span>Save and continue</span>
                <SaveIcon />
              </>
            )}
          </button>
        </div>
        <p className={styles.secondaryWrapper}>
          *Please note that if you do not find an error now, you will be able to
          resolve this issue only through the support service.
          <br />
          Thank you for your attention.
        </p>
      </form>
    </>
  );
};

export default ChangeNameForm;
