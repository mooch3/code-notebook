import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import bundle from "../bundler";
import Resizable from "./Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <CodeEditor
          initialValue="const a = 2;"
          onChange={(value) => setInput(value)}
        />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};
export default CodeCell;
