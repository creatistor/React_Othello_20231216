import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <Header />
      {/* 今回は8×8の盤面なのでpropsで8を与える */}
      <Board lines={8} />
    </div>
  );
}

export default App;
