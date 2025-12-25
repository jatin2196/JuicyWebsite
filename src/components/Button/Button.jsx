import styles from "./Button.module.scss";

const Button = ({ text = "", children = null, className = "" }) => {
  const content = text || children;

  return (
    <button className={`${styles.button} ${className || ""}`}>{content}</button>
  );
};

export default Button;
