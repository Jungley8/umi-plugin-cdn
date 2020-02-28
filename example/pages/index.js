import styles from "./index.css";

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <img src={require("../img/logo.png")} alt="logo" />
    </div>
  );
}
