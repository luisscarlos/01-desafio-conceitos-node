const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// List
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Create
app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repository = {id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

// Update
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

// Delete
app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).json({});
});

// Add Like
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error:"Repository not found." });
  }

  () => repository.id += 1;

  return response.json(repositories);
});

module.exports = app;
