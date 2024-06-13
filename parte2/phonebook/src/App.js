import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  cretatePerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./services/persons";
import NotificationSuccess from "./components/NotificationSuccess";
import NotificationError from "./components/NotificationError";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMensage, setErrorMensage] = useState("");
  const [okMensage, setOkMensage] = useState("");
  const [filter, setFilter] = useState([{ name: "", number: "", id: "" }]);
  const [newFilter, setNewFilter] = useState("");

  React.useEffect(() => {
    getAllPersons().then((response) => {
      setPersons(response.data);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (newName === "") {
      return;
    } else if (
      persons.some((person) => person.number !== newNumber) &&
      persons.some((person) => person.name === newName)
    ) {
      const index = persons.find((person) => person.name === newName);
      const attNumber = window.confirm(
        `${newName} is already addeed to phonebook, replace the old number with a new one?`
      );
      if (!attNumber && !index) return;
      const upPerson = {
        ...index,
        number: newNumber,
      };

      updatePerson(index.id, upPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== index.id ? person : response.data
            )
          );
          setFilter(
            persons.map((person) =>
              person.id !== index.id ? person : response.data
            )
          );
        })
        .catch((error) => {
          setErrorMensage(
            `Informations of ${newName} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMensage(null);
          }, 5000);
        });

      setOkMensage(`${newName} number changed to ${newNumber}`);
      setTimeout(() => {
        setOkMensage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
      return;
    } else if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(newName.slice(0, 2) + (persons.length + 1)),
    };
    cretatePerson(newPerson).then((resposne) => {
      setPersons(persons.concat(resposne.data));
    });
    setOkMensage(`Added ${newName} to phonebook`);
    setTimeout(() => {
      setOkMensage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  }

  function addName(event) {
    setNewName(event.target.value);
  }

  function addNumber(event) {
    setNewNumber(event.target.value);
  }

  function addFilter(event) {
    setNewFilter(event.target.value.toLowerCase());
    if (newFilter === "") {
      setFilter(persons);
    } else {
      const filter = persons.filter((person) => {
        const name = person.name.toLowerCase();
        return name.includes(newFilter);
      });
      setFilter(filter);
    }
  }

  async function removeContact(id, name) {
    const confirm = window.confirm(`Delete: ${name}?`);
    if (!confirm) return;
    deletePerson(id).then(() => {
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
      setFilter(updatedPersons);
    });
  }

  if (!persons) return;
  return (
    <div>
      <h2>Phonebook</h2>

      {okMensage && !errorMensage && (
        <NotificationSuccess mensage={okMensage} />
      )}
      {errorMensage && <NotificationError mensage={errorMensage} />}

      <Filter newFilter={newFilter} addFilter={addFilter} />
      <h2>Add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        addName={addName}
        addNumber={addNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>

      {newFilter !== "" ? (
        <Persons onClick={removeContact} filter={filter} />
      ) : (
        <Persons onClick={removeContact} filter={persons} />
      )}
    </div>
  );
};

export default App;
