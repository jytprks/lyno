import { useState } from "react";
import style from "./Home.module.css";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new room");
  };
  const handleInputEnter = (e) => {
    if (e.code == "Enter") {
      joinRoom();
    }
  };

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Room Id & User Name required");
      return;
    }
    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        userName,
      },
    });
  };
  return (
    <div className={style.homePageWrapper}>
      <div className={style.formWrapper}>
        <h1 className={style.appName}>LYNO - CODE</h1>
        <h4 className={style.mainLabel}>Paste invitation room Id</h4>
        <div className={style.inputGroup}>
          <input
            type="text"
            className={style.inputBox}
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className={style.inputBox}
            placeholder="USER NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            onKeyUp={handleInputEnter}
          />
          <button className={`${style.btn} ${style.joinBtn}`} onClick={joinRoom}>
            Join
          </button>
        </div>
        <span className={style.createInfo}>
          If you don't have an invite then create &nbsp;{" "}
          <a onClick={createNewRoom} href="" className={style.createNewBtn}>
            new room
          </a>
        </span>
      </div>
    </div>
  );
};
export default Home;
