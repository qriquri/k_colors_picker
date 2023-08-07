import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppContainer } from "./components/AppContainer";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Store";
function App() {
  return (
    <ReduxProvider store={store}>
      <AppContainer />
    </ReduxProvider>
  );
}

export default App;
