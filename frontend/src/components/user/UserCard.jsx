import styles from "./UserCard.module.css";  // Change the import

const userCard = ({ userName }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className={styles.userDiv}>
      <span className="name">{userName}</span>
      <div className={styles.userCard}>
        <div className={styles.nameInitial}>{getInitials(userName)}</div>
      </div>
    </div>
  );
};
export default userCard;
