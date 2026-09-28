import { useForm } from "react-hook-form";
import { instance } from "../../http/instance";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import Textarea from "../shared/Textarea/Textarea";
import styles from "./ContactForm.module.scss";

const requiredRegisterArgs = {
  required: {
    value: true,
    message: "This field is required",
  },
};

const ContactForm = ({ wrapperClassname = "" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [messageApi, contextHolder] = useNotificationMessage();

  const handleSendMessage = async (data) => {
    try {
      await instance.post('/user/submit-form', data)

      reset();

      messageApi.success({
        duration: 3,
        content: "Your message has been sent!",
      });
    } catch (error) {
      messageApi.error({
        duration: 3,
        content: "Contact service is currently unavailable. Try again later",
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
    const fields = Object.keys(errors);

    messageApi.error({
      duration: 3,
      content: `Fields ${fields.join(", ")} is required`,
    });
  };

  return (
    <>
      {contextHolder}
      <form
        className={`${styles.formWrapper} ${wrapperClassname}`}
        onSubmit={handleSubmit(handleSendMessage, onError)}
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
        <button type="submit" disabled={isSubmitting}>
          Send message
        </button>
      </form>
    </>
  );
};

export default ContactForm;
