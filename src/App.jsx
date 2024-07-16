import { useState } from "react";
import "./App.css";
import CryptarithmSolver from "./components/CryptarithmSolver";
import Footer from "./components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CryptarithmSolver />
    <Footer />
    </>
  );
}

export default App;
