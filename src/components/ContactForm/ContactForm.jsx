import React from "react";
import styles from "./ContactForm.module.scss";
// import { Link } from "react-router-dom";
import Textarea from "../shared/Textarea/Textarea";

const ContactForm = ({ wrapperClassname = "" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.values);
  };

  return (
    <form
      className={`${styles.formWrapper} ${wrapperClassname}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.formHeader}>
        <span className={styles.title}>Contact us</span>
        <span className={styles.secondaryTitle}>
          Still have more questions? Would be glad to assist.
        </span>
      </div>
      <div className={styles.fields}>
        <label>
          <span>Name</span>
          <input type="text" name="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" />
        </label>
        <label>
          <span>Phone</span>
          <input type="text" name="phone" />
        </label>
        <Textarea
          name="message"
          minRows={4}
          maxRows={4}
          placeholder="Message..."
        />
      </div>
      <button type="submit">Send message</button>
    </form>
  );
};

export default ContactForm;
