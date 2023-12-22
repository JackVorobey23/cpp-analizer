import SyntaxHighlighter from "react-syntax-highlighter";
import "./App.css";
import { useEffect, useState } from "react";
import { GetCodeErrors } from "./GetCodeErrors";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [observed, setObserved] = useState("");
  const [errorInfo, setErrorInfo] = useState<{
    status: string;
    compile_output: string;
  } | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [errorInfo]);

  const handleInputChange = (e: any) => {
    const text = e.target.value;
    // Replace newline characters (\n) with <br> elements
    const formattedText = text.replace(/\n/g, "\n");
    setObserved(formattedText);
    console.log(text);
  };

  return (
    <div
      className="d-flex m-4"
      style={{
        height: "100vh",
      }}
    >
      <div className="w-50">
        <div className="d-flex justify-content-between p-2">
          <div className="">Code:</div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setLoading(true);
              console.log(observed.replace(/\n/g, "\\n"));
              GetCodeErrors(observed, setErrorInfo);
            }}
          >
            Run
          </button>
        </div>
        <div className="d-flex position-relative m-2">
          <div className="d-flex align-items-center w-100">
            <SyntaxHighlighter
              customStyle={{
                width: "100%",
                top: 10,
                position: "absolute",
                color: "red",
                whiteSpace: "pre-wrap",
              }}
            >
              {observed || ""}
            </SyntaxHighlighter>
            <textarea
              className=""
              spellCheck={false}
              style={{
                display: "block",
                backgroundColor: "transparent",
                position: "absolute",
                top: 15,
                left: 5,
                color: "transparent",
                height: "100vh",
                width: "100%",
                border: "none",
              }}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-50 m-3">
        <h3 className="text-center">Compilation result:</h3>
        <br />
        {errorInfo !== null ? (
          errorInfo.status === "Accepted" ? (
            <div className="alert alert-success">No errors!</div>
          ) : (
            <div className="alert alert-danger">
              Error:
              {errorInfo.compile_output}
            </div>
          )
        ) : (
          <p className=".fs-5 text">
            Run your code and see if there is any errors!
          </p>
        )}
        <button className="btn btn-secondary float-end" hidden={!errorInfo}>
          Clear
        </button>
      </div>
      <div
        hidden={!loading}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="spinner-border">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
