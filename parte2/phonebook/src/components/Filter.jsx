import React from "react";

const Filter = ({ newFilter, addFilter }) => {
  return (
    <form>
      <div>
        search by name: <input value={newFilter} onChange={addFilter} />
      </div>
    </form>
  );
};

export default Filter;
