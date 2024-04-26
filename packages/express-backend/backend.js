import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Heyyyy");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    userServices
      .findUserByNameAndJob(name, job)
      .then((users) => {
        res.status(200).json({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
      });
  } else {
    userServices
      .getUsers(name, job)
      .then((users) => {
        res.status(200).json({ users_list: users });
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
      });
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  userServices
    .deleteUser(userId)
    .then(() => res.status(204).send("delete success"))
    .catch((error) => {
      console.log(error);
      res.status(404);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404);
      } else {
        res.json(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
