import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundleStatus: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      throw err;
    };
      window.addEventListener('error', () => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err)
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundleStatus }) => {
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  const iframe = useRef<any>();

  console.log(bundleStatus);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundleStatus && <div className="preview-error">{bundleStatus}</div>}
    </div>
  );
};

export default Preview;
