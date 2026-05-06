import { useState } from "react";
import { docParserInstance } from "../../http/instance";
import Spinner from "../Spinner/Spinner";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";

const bodyKey = "google_doc_url";
const googleDocURL =
  "https://docs.google.com/document/d/1OovJZewE-l0O5VnAgzOzVPPzfN7N9nmsmIG0XHUFApU/edit?tab=t.0";

const ImportForm = ({ setDocument, type }) => {
  const [value, setValue] = useState(googleDocURL);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGoogleDoc = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append(bodyKey, value);

      const response = await docParserInstance.post(`/parse/${type}`, formData);

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    setDocument(null);
    const doc = await fetchGoogleDoc();
    if (doc) {
      console.log(doc);
      setDocument(doc);
    }
  };

  return (
    <>
      <div className={styles.importForm}>
        <div>
          <input
            type="text"
            placeholder="Paste google document link here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <CommonButton
          onClick={handleImport}
          disabled={isLoading || !value}
          text="Fetch document"
          hoverVariant="transparentTextDark"
          wrapperStyles={{ width: "auto" }}
        />
      </div>
      {isLoading && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ImportForm;
