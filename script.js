document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  // Nom du repo GitHub Pages
  const githubBaseURL = "https://sufanaccount.github.io/CV"; // Remplace par ton vrai URL GitHub Pages

  // Variables d'état
  let currentDirectory = "CV"; // Répertoire racine
  const directories = ["projects", "contact"]; // Répertoires valides sous 'CV'

  // Introduction avant le shell
  const introText = `Bienvenue sur mon CV interactif en ligne !\n\n
Tapez 'ls' pour voir les fichiers disponibles.\n
Tapez 'cd projects' pour voir mes projets.\n
Tapez 'cd contact' pour obtenir mes informations de contact.\n\n
Prêt à commencer ? Tapez une commande...\n`;

  // Afficher l'introduction
  output.innerHTML = `<span class="intro-text">${introText}</span>`;

  let prompt = "CV@guest:~# "; // Invite de commande

  // Liste des commandes
  const commands = {
    ls: () => {
      if (currentDirectory === "CV") {
        return "projects  contact  cv.pdf"; // Afficher les fichiers dans 'CV'
      }
      return "Aucun fichier ici.";
    },
    cat: (args) => {
      if (args[0] === "cv.pdf" && currentDirectory === "CV") {
        output.innerHTML += `<br>Téléchargement de <a href="${githubBaseURL}/cv.pdf" target="_blank">cv.pdf</a>...<br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/cv.pdf`;
        }, 500); // Petit délai pour garantir l'exécution
        return "";
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (args[0] === "projects" && currentDirectory === "CV") {
        output.innerHTML += `<br>Redirection vers projects...<br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/projects`;
        }, 500);
        return "";
      }
      if (args[0] === "contact" && currentDirectory === "CV") {
        output.innerHTML += `<br>Redirection vers contact...<br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/contact`;
        }, 500);
        return "";
      }
      return "Répertoire non trouvé.";
    }
  };

  // Gestion des commandes
  commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = commandInput.value.trim();
      commandInput.value = "";
      output.innerHTML += `<span class="prompt">${prompt}</span><span class="command">${command}</span><br>`;
      executeCommand(command);
    }
  });

  // Fonction d'exécution des commandes
  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];

    if (commands[cmd]) {
      const result = commands[cmd](args);
      if (result) output.innerHTML += `<span class="output">${result}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }

    output.scrollTop = output.scrollHeight; // Scroll vers le bas
  }
});
