import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  console.log(anecdotes.length);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleClickVote = () => {
    setPoints({
      ...points,
      [selected]: points[selected] + 1,
    });
  };

  const numberOfVotes = points[selected];
  const anecdoteChoice = anecdotes[selected];
  const maxVotes = Math.max(...Object.values(points));
  const maxVotesIndex = Object.values(points).indexOf(maxVotes);
  const anecdoteWithMaxVotes = anecdotes[maxVotesIndex];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdoteChoice}</p>
      <h4>has {numberOfVotes} votes</h4>
      <Button handleClick={handleClickVote} text={"vote"} />
      <Button handleClick={handleClick} text="next anecdote" />
      <h1>Anecdote whit most votes</h1>
      <p>{anecdoteWithMaxVotes}</p>
      <h4>has {maxVotes} votes</h4>
    </div>
  );
};

export default App;
