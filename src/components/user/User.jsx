import "./User.css";
const User = ({ userName }) => {
  return (
    <div className="userDiv">
      <span className="name">{userName}</span>
      <div className="userCard">
        <div className="nameInitial">JP</div>
      </div>
    </div>
  );
};
export default User;
