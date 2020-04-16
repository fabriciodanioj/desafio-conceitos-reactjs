import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function fetchData() {
    const response = await api.get("/repositories");

    setRepositories(response.data);

    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `bootcamp-gostack-desafios-${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios",
      techs: ["React", "NodeJS"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((e) => e.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
