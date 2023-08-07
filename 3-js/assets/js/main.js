document.addEventListener("DOMContentLoaded", function() {
  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("menu-active");
    menu.classList.toggle("menu", !menu.classList.contains("menu-active"));
  };
  const menuButton = document.getElementById("menu-button");
  menuButton.addEventListener("click", toggleMenu);

  const playVideo = () => {
    const videoCover = document.getElementById("video-cover");
    const videoPlayer = document.getElementById("video-player");
    videoCover.style.display = "none";
    videoPlayer.play();
  };
  const videoCover = document.getElementById("video-cover");
  videoCover.addEventListener("click", playVideo);

  const toggleAccordionItems = document.querySelectorAll(".accordion .item");
  toggleAccordionItems.forEach((item) => {
    const toggleAccordion = () => {
      item.classList.toggle("-active");
      const description = item.querySelector(".description");
      description.classList.toggle("-active");
    };
    const title = item.querySelector(".title");
    title.addEventListener("click", toggleAccordion);
  });

  const extractElement = document.querySelector("#wiki .extract");
  async function loadAndShowApiData() {
    try {
      const response = await fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Alber%20Einstein");
      if (!response.ok) {
        throw new Error("Erro ao carregar a informação!");
      }
      const data = await response.json();
      extractElement.textContent = data.fact;
    } catch (error) {
      console.error("Ops! Ocorreu um erro", error);
    }
  }
  loadAndShowApiData();

  const modalWiki = document.querySelector(".modal-wiki");
  const toggleModal = () => {
    modalWiki.classList.toggle("modal-wiki-active");
    const btn = document.getElementById("button-modal");
    btn.textContent = modalWiki.classList.contains("modal-wiki-active") ? "Fechar" : "Abrir foto";
  };
  const btn = document.getElementById("button-modal");
  btn.addEventListener("click", toggleModal);
  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", toggleModal);
  window.onclick = function (event) {
    if (event.target === modalWiki) {
      toggleModal();
    }
  };
});
