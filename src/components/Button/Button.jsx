import cx from "classnames";
import styles from "./Button.module.scss";

const Button = ({ text = "", children = null, className = "", color = "" }) => {
  const content = text || children;

  const typeClass = styles?.[color] || "";

  return (
    <button className={cx(styles.button, className, typeClass)}>
      <span className={styles.text}>{content}</span>
    </button>
  );
};

export default Button;
