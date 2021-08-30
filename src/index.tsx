import { Provider } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from "./state";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CellList from "./components/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
