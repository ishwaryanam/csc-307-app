import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  const usersByName = findUserByName(name);
  return usersByName.filter((user) => user["job"] === job);
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
app.use(cors());
app.use(express.json());

const addUser = (user) => {
  user.id = generateRandomId();
  const userWithId = { id: user.id, ...user };
  users["users_list"].push(userWithId);
  return userWithId;
};

const generateRandomId = () => {
  let randId = "";
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  for (let i = 0; i < 3; i++) {
    randId += letters[Math.floor(Math.random() * 26)];
  }

  for (let i = 0; i < 3; i++) {
    randId += Math.floor(Math.random() * 9).toString();
  }
  return randId;
};
const deleteUser = (user) => {
  const ind = users["users_list"].findIndex((u) => u.name === user);
  if (ind != -1) {
    users["users_list"].splice(ind, 1);
  }
};

app.get("/", (req, res) => {
  res.send("Heyyyy");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users", (req, res) => {
  const userToDel = req.body.name;
  deleteUser(userToDel);
  res.send();
});

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
  console.log(`Example app listening at http://localhost:${port}`);
});
