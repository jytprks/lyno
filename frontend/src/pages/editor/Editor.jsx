import { useEffect, useRef, useState } from "react";
import Output from "../../components/output/Output";
import CodeEditor from "../../components/codeEditor/CodeEditor";
import Usercard from "../../components/user/UserCard";
import styles from "./Editor.module.css";
import { initSocket } from "../../socket";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ACTION from "../../actions";
import toast from "react-hot-toast";

const Editor = () => {
  const socketRef = useRef(null);
  const navigator = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const [outputValue, setOutPut] = useState(null);
  const [connected, setConnected] = useState([]);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_timeout", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      function handleError(err) {
        console.log("socket error", err);
        toast.error("Socket connection failed, try again later");
        navigator("/");
      }
      socketRef.current.emit(ACTION.JOIN, {
        roomId,
        userName: location.state?.userName,
      });
      socketRef.current.on(ACTION.JOINED, ({ clients, socketId, userName }) => {
        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined the room`);
        }
        setConnected(clients);
      });
    };
    init();
  }, []);
  const handleOutPut = (value) => {
    setOutPut(value);
  };

  if (!location.state) {
    <Navigate to="/" replace />;
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.participantDiv}>
        <div className={styles.participantContainer}>
          <div className={styles.header}>
            <h1 className="appName">LYNO - CODE</h1>
          </div>
          <div className={styles.connectedDiv}>
            {connected.map((user) => (
              <Usercard key={user.socketId} userName={user.userName} />
            ))}
            <div className={styles.buttonDiv}>
              <button className={styles.btn}>Copy room Id</button>
              <button className={styles.btn}>Leave</button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className={styles.codePad}>
        <div className={styles.editorSection}>
          <CodeEditor handleOutPut={handleOutPut} />
        </div>
        <div className={styles.outputSection}>
          <Output value={outputValue} />
        </div>
      </div>
    </div>
  );
};
export default Editor;
