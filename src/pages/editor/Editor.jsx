import { useState } from "react";
import Output from "../../components/output/Output";
import CodeEditor from "../../components/codeEditor/CodeEditor";
import User from "../../components/user/user";

const Editor = () => {
  const [outputValue, setOutPut] = useState(null);
  const [connected, setConnected] = useState([
    { socketId: 1, userName: "JyotiPrakash Ghorai" },
    { socketId: 2, userName: "Rupashri Parial Ghorai" },
    { socketId: 1, userName: "JyotiPrakash Ghorai" },
  ]);
  const handleOutPut = (value) => {
    setOutPut(value);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        gap: "16px",
      }}
    >
      <div
        className="participent-viv"
        style={{
          flex: "0.2",
          minWidth: "20%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            border: "1px solid #333",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#393053",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #333",
            }}
          >
            <h1 className="appName">LYNO - CODE</h1>
          </div>
          <div
            className="output"
            style={{
              height: "calc(100% - 50px)",
              backgroundColor: "#0F0F0F",
              padding: "10px",
              color: "#D4D4D4",
              overflow: "auto",
            }}
          >
            <div className="connected">
              {connected.map((user) => (
                <User key={user.socketId} userName={user.userName} />
              ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div
        className="code-pad"
        style={{
          flex: "0.8",
          minWidth: "80%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ flex: "0.6", minHeight: "60%" }}>
          <CodeEditor handleOutPut={handleOutPut} />
        </div>
        <div style={{ flex: "0.4", minHeight: "30%" }}>
          <Output value={outputValue} />
        </div>
      </div>
    </div>
  );
};
export default Editor;
