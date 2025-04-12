import { useState } from "react";
import CodeEditor from "../codeEditor/CodeEditor";
import Output from "../output/Output";

const Home = () => {
  const [outputValue, setOutPut] = useState(null);
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
          flex: "0.3",
          minWidth: "30%",
        }}
      >
        sadc
      </div>
      <div
        className="code-pad"
        style={{
          flex: "0.7",
          minWidth: "70%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ flex: "0.6", minHeight: "60%" }}>
          <CodeEditor handleOutPut={handleOutPut} />
        </div>
        <div style={{ flex: "0.4", minHeight: "40%" }}>
          <Output value={outputValue} />
        </div>
      </div>
    </div>
  );
};
export default Home;
