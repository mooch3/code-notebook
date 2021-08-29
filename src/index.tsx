import { Provider } from "react-redux";
import { store } from "./state";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
