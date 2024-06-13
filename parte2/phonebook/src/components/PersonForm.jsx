import React from "react";

const PersonForm = ({
  handleSubmit,
  addName,
  addNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={addName} />
      </div>
      <div>
        phone: <input value={newNumber} onChange={addNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
