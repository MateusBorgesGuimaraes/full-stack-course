import { useState } from "react";

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Static = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const positivePercentage = (good / total) * 100;
  const avarage = (good - bad) / total;

  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="avarage" value={avarage} />
          <StatisticsLine text="positive" value={positivePercentage + " %"} />
        </tbody>
      </table>
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title title="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Static good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
