import { useState } from "react";
import { useEffect } from "react";
import divider from "./assets/images/pattern-divider-desktop.svg";
import dice from "./assets/images/icon-dice.svg";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ slip: {} });

  const fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const responseJson = await response.json();
      setData(responseJson);
      setLoading(false);
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="advice">
      <p>ADVICE #{data.slip.id}</p>
      <h3>&ldquo;{data.slip.advice} &rdquo;</h3>
      <img
        src={divider}
        alt="divider"
        width="100%"
        style={{ marginBottom: "1.5rem" }}
      />
      <div className="dice" onClick={fetchAdvice}>
        <img src={dice} alt="dice roller" width={20} />
      </div>
    </div>
  );
}

export default App;
