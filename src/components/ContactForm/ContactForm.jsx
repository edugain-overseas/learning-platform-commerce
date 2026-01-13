import React from "react";
import styles from "./ContactForm.module.scss";
import Textarea from "../shared/Textarea/Textarea";
import { useForm } from "react-hook-form";

const requiredRegisterArgs = {
  required: {
    value: true,
    message: "This field is required",
  },
};

const ContactForm = ({ wrapperClassname = "" }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className={`${styles.formWrapper} ${wrapperClassname}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formHeader}>
        <span className={styles.title}>Contact us</span>
        <span className={styles.secondaryTitle}>
          Still have more questions? Would be glad to assist.
        </span>
      </div>
      <div className={styles.fields}>
        <label className={errors.name ? styles.withError : ""}>
          <span>Name</span>
          <input type="text" {...register("name", requiredRegisterArgs)} />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </label>
        <label className={errors.email ? styles.withError : ""}>
          <span>Email</span>
          <input type="email" {...register("email", requiredRegisterArgs)} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </label>
        <label className={errors.phone ? styles.withError : ""}>
          <span>Phone</span>
          <input type="text" {...register("phone", requiredRegisterArgs)} />
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
        </label>
        <Textarea
          minRows={4}
          maxRows={4}
          placeholder="Message..."
          {...register("message")}
        />
      </div>
      <button type="submit">Send message</button>
    </form>
  );
};

export default ContactForm;
