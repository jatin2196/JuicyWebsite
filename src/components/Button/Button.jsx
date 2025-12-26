import cx from "classnames";
import styles from "./Button.module.scss";
import { useEffect } from "react";

const Button = ({ text = "", children = null, className = "", color = "" }) => {
  const content = text || children;

  const typeClass = styles?.[color] || "";

  useEffect(() => {
    console.log("Button type:", color, typeClass);
  }, [color]);

  return (
    <button className={cx(styles.button, className, typeClass)}>
      <span className={styles.text}>{content}</span>
    </button>
  );
};

export default Button;
