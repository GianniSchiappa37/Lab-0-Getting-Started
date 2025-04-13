// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "CharlieHello",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserByName = (name,job) => {
    return users["users_list"]
    .filter((user) => user["name"] === name)
    .filter((user)=> user["job"] === job);
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There World!");
});

  
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
  
    let result = users.users_list;
  
    if (name) {
      result = result.filter((user) => user["name"] === name); // Filter by name
    }
    
    if (job) {
      result = result.filter((user) => user["job"] === job); // Filter by job
    }
  
    res.send({ users_list: result });
  });

  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
  
  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});


const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
  const generateId = () => {
    return Math.random().toString(36).substr(2, 8); // Generates short random alphanumeric ID
  };


  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateId();
    const addedUser = addUser(userToAdd);
    res.status(201).send(addedUser);
  });


  app.delete("/users/:id", (req, res) => {
    const id = req.params.id; // This grabs the 'id' from the URL
    const index = users.users_list.findIndex(user => user.id === id);
  
    if (index === -1) {
      return res.status(404).send("User not found."); // If not found, return 404
    }
  
    const deletedUser = users.users_list.splice(index, 1); // Remove the user from the list
    res.status(200).send({ message: "User deleted successfully.", user: deletedUser[0] }); // Respond with success and the deleted user
  });