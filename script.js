document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  // Nom du repo GitHub Pages
  const githubBaseURL = "https://sufanaccount.github.io/CV"; // Remplace par ton vrai URL GitHub Pages

  // Variables d'état
  let currentDirectory = "CV"; // Répertoire racine modifié à 'CV'
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
        return "projects  contact  cv.pdf"; // Afficher les fichiers dans le répertoire 'CV'
      }
      return "Aucun fichier ici.";
    },
    cat: (args) => {
      if (!args[0]) {
        return "Veuillez spécifier un fichier à afficher.";
      }
      if (args[0] === "cv.pdf" && currentDirectory === "CV") {
        output.innerHTML += `<span class="output">Téléchargement de cv.pdf...</span><br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/cv.pdf`;
        }, 1000);
        return "";
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (!args[0]) {
        return "Veuillez spécifier un répertoire.";
      }
      if (args[0] === "projects" && currentDirectory === "CV") {
        output.innerHTML += `<span class="output">Accès à 'projects'...</span><br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/projects`;
        }, 1000);
        return "";
      }
      if (args[0] === "contact" && currentDirectory === "CV") {
        output.innerHTML += `<span class="output">Accès à 'contact'...</span><br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/contact`;
        }, 1000);
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
      const result = commands[cmd](args.slice(1));
      if (result) output.innerHTML += `<span class="output">${result}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }

    output.scrollTop = output.scrollHeight; // Scroll vers le bas
  }
});
