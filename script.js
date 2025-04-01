document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  // Variables d'état
  let currentDirectory = 'CV'; // Répertoire racine modifié à 'CV'
  const directories = ['projects', 'contact']; // Répertoires valides sous 'CV'

  // Introduction avant le shell
  const introText = `Bienvenue sur mon CV interactif en ligne !\n\nTapez 'ls' pour voir les fichiers disponibles.\nTapez 'cd projects' pour voir mes projets.\nTapez 'cd contact' pour obtenir mes informations de contact.\n\nPrêt à commencer ? Tapez une commande pour commencer...\n`;

  // Afficher l'introduction
  output.innerHTML = `<span class="intro-text">${introText}</span>`;

  let prompt = "CV@guest:~# "; // Invitation initiale

  // Liste des commandes
  const commands = {
    ls: () => {
      // Si l'on est dans 'CV', on affiche les éléments principaux
      if (currentDirectory === 'CV') {
        return "projects  contact  cv.pdf";
      }
      // Si l'on est dans un sous-répertoire, afficher les fichiers spécifiques
      return "";
    },
    cat: (args) => {
      if (args[0] === "cv.pdf" && currentDirectory === "CV") {
        return "Télécharger le CV: [cv.pdf]"; // Message pour télécharger le fichier
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (args[0] === "projects" && currentDirectory === "CV") {
        currentDirectory = "projects";
        prompt = "CV@guest:/projects# ";
        return "Changement de répertoire vers 'projects'";
      } else if (args[0] === "contact" && currentDirectory === "CV") {
        currentDirectory = "contact";
        prompt = "CV@guest:/contact# ";
        return "Changement de répertoire vers 'contact'";
      }
      return "Répertoire non trouvé.";
    }
  };

  // Event listener pour la saisie de commande
  commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = commandInput.value;
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
      output.innerHTML += `<span class="output">${commands[cmd](args)}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }
    output.scrollTop = output.scrollHeight; // Scroll down
  }
});
