import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([ ]);

  
  function removeOneCharacter(index) {
    const id = characters[index].id;
  
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status === 200 || response.status === 204) {
        const updated = characters.filter((_, i) => i !== index);
        setCharacters(updated);
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Failed to delete user");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
  }
  

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );
  
function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

function updateList(person) {
  postUser(person)
    .then((response) => {
      if (response.status === 201) {
        return response.json(); 
      } else {
        throw new Error("Failed to add user");
      }
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]); 
    })
    .catch((error) => {
      console.log(error);
    });
}


  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );

}


  

export default MyApp;