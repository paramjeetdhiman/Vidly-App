import React from "react";
import Movies from "./components/Movies";

function App() {
  return (
    <div className="App ">
      <div className="jumbotron bg-info"></div>
      <main className="container">
        <Movies />
      </main>
    </div>
  );
}

export default App;
