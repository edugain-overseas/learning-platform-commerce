import MainSearchBar from "../../../components/SearchBar/MainSearchBar";
import styles from "../HomePage.module.scss";

const HomeHeroSearchbar = () => {
  return (
    <div className={styles.heroSearchbar}>
      <MainSearchBar wrapperClassName={styles.heroSearch}/>
    </div>
  );
};

export default HomeHeroSearchbar;
