import React from "react";

const Persons = ({ filter, onClick }) => {
  return (
    <ul>
      {filter.map((one) => (
        <li key={one.name}>
          {one.name} : {one.number}
          --------
          <button onClick={() => onClick(one.id, one.name)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
