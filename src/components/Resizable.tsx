import { useEffect, useState } from "react";
import "./Resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [width, setWidth] = useState(window.innerWidth * 0.75)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    if (timer) {
      clearTimeout(timer);
    }
    const listener = () => {
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
            setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      height: Infinity,
      width,
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 50],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
      height: 300,
      width: Infinity,
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
