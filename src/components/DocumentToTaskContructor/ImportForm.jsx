import React, { useState } from "react";
import { docParserInstance } from "../../http/instance";
import Spinner from "../Spinner/Spinner";
import styles from "./DocumentToTaskContructor.module.scss";
import CommonButton from "../shared/CommonButton/CommonButton";

const bodyKey = "google_doc_url";

const ImportForm = ({ setDocument, type, cacheInterface }) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getCachedDoc, saveToCache } = cacheInterface;

  const fetchGoogleDoc = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append(bodyKey, value);

      const response = await docParserInstance.post(`/parse/${type}`, formData);

      if (response.data) {
        saveToCache(value, type, response.data);
      }

      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    setDocument(null);

    const cachedData = getCachedDoc(value, type);

    if (cachedData) {
      console.log(`🚀 Loaded ${type} from cache:`, value);
      setDocument(cachedData);
      return;
    }

    const doc = await fetchGoogleDoc();
    if (doc) {
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
