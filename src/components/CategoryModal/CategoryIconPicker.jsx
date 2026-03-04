import { useCategoryIcons } from "../../context/CategoryIconsContext";
import { serverName } from "../../http/server";
import styles from "./CategoryModal.module.scss";

const CategoryIconPicker = ({ selectedId, setSelectedId }) => {
  const { icons } = useCategoryIcons();

  if (icons.length === 0) {
    return null;
  }

  return (
    <div className={styles.categoryIconPickerContainer}>
      <h4>Choose category icon</h4>
      <ul>
        {icons.map((icon) => (
          <li key={icon.id}>
            <div
              className={`${styles.iconContainer} ${
                selectedId === icon.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedId(icon.id)}
            >
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${serverName}/${icon.path})` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryIconPicker;
