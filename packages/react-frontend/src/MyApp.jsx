import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index]._id;

    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters(characters.filter((character) => character._id !== id));
        } else if (res.status === 404) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.ok && res.status === 201) {
          return res.json();
        } else {
          console.log(error);
          //throw new Error("user post fail");
          return null;
        }
      })
      .then((newPerson) => {
        setCharacters([...characters, newPerson]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((json) => json.users_list)
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((users) => setCharacters(users))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
