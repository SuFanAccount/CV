document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  // Nom du repo GitHub Pages
  const githubBaseURL = "https://SuFanAccount.github.io/CV"; // Remplace par ton vrai URL GitHub Pages

  // Variables d'état
  let currentDirectory = "CV";
  const directories = ["projects", "contact"];

  // Introduction
  const introText = `Bienvenue sur mon CV interactif en ligne !\n\n
Tapez 'ls' pour voir les fichiers disponibles.\n
Tapez 'cd projects' pour voir mes projets.\n
Tapez 'cd contact' pour obtenir mes informations de contact.\n\n
Prêt à commencer ? Tapez une commande...\n`;

  output.innerHTML = `<span class="intro-text">${introText}</span>`;

  let prompt = "CV@guest:~# ";

  // Commandes
  const commands = {
    ls: () => {
      return "projects  contact  cv.pdf"; 
    },
    cat: (args) => {
      if (args[0] === "cv.pdf") {
        window.open(`${githubBaseURL}/cv.pdf`, "_blank"); // Ouvre le CV dans un nouvel onglet
        return "Téléchargement de cv.pdf...";
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (directories.includes(args[0])) {
        window.location.href = `${githubBaseURL}/${args[0]}/index.html`; // Redirection correcte
        return;
      }
      return "Répertoire non trouvé.";
    }
  };

  // Gestion des entrées
  commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = commandInput.value.trim();
      commandInput.value = "";
      output.innerHTML += `<span class="prompt">${prompt}</span><span class="command">${command}</span><br>`;
      executeCommand(command);
    }
  });

  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];

    if (commands[cmd]) {
      const result = commands[cmd](args);
      if (result) output.innerHTML += `<span class="output">${result}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }

    output.scrollTop = output.scrollHeight; 
  }
});
