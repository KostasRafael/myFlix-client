import { createRoot } from "react-dom/client";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import { store } from "./redux/store";
import { Provider } from "react-redux";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <Container
        fluid
        className="p-0 m-0"
        style={{ height: "100vh", border: "5px solid red" }}
      >
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
