import React from "react";
import "./App.css";

import DrizzleLoader from "./DrizzleLoader";
import ReadValue from "./components/ReadValue";
import SetValue from "./components/SetValue";

// How to use DrizzleLoader:
// 1. pass in the drizzle instance as a prop
// 2. tell the component what to render when drizzle is not yet ready
// 3. drizzle is ready, here is the drizzle state as an observable
//    for you to use in your components

const App = ({ drizzle }) => (
  <DrizzleLoader
    drizzle={drizzle}
    renderLoading={() => <div>Loading Drizzle...</div>}
    render={({ drizzleState$ }) => (
      <div className="App">
        <ReadValue drizzle={drizzle} drizzleState$={drizzleState$} />
        <SetValue drizzle={drizzle} drizzleState$={drizzleState$} />
      </div>
    )}
  />
);

export default App;
