const URL_API = "https://booktracker-api-trabalho-ppi.onrender.com";

const deletarLivro = async (id) => {
  try {
    const response = await fetch(`${URL_API}/livros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }
  } catch (erro) {
    console.error("Erro:", erro);
  }
};
