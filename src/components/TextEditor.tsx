import "./TextEditor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("# Header");

  const clickRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        clickRef.current &&
        event.target &&
        clickRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={clickRef}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
