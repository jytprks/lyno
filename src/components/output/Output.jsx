const Output = ({ value }) => {
  return (
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
        <span style={{ color: "white", fontFamily: "monospace" }}>OUT-PUT</span>
        <span style={{ marginLeft: "auto", color: "#888" }}>Auto</span>
      </div>
      <div
        className="output"
        style={{
          height: "100%",
          backgroundColor: "#0F0F0F",
          padding: "10px",
          color: "#D4D4D4",
          overflow: "auto",
        }}
      >
        {value != null ? value : ""}
      </div>
    </div>
  );
};
export default Output;
