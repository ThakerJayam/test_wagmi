import logo from "./logo.svg";
import "./App.css";
import { connect, signMessage } from "wagmi/actions";
import { useConnect } from "wagmi";

const onHandleConnectAndSign = (connector) => {
  console.log("connecting");
  connect({ connector }).then(() => {
    console.log("signing");
    signMessage({ message: "message" });
  });
};

function App() {
  const { connectors } = useConnect();
  console.log(connectors);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>HElllo</h1>
        <button
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onHandleConnectAndSign(connectors[0])}>
          submit
        </button>
      </header>
    </div>
  );
}

export default App;
