document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  let isRoot = true;

  // Introduction avant le shell
  const introText = `Bienvenue sur mon CV interactif en ligne !\n\nTapez 'ls' pour voir les fichiers disponibles.\nTapez 'cd projects' pour voir mes projets.\nTapez 'cd contact' pour obtenir mes informations de contact.\n\nPrêt à commencer ? Tapez une commande pour commencer...\n`;

  // Afficher l'introduction
  output.innerHTML = `<span class="intro-text">${introText}</span>`;

  let prompt = "root@guest:~# "; // Invitation à entrer une commande
  let history = [];

  // Liste des commandes
  const commands = {
    ls: () => {
      return isRoot ? "projects  contact  cv.pdf" : "";
    },
    cat: (args) => {
      if (args[0] === "cv.pdf") {
        return "Télécharger le CV: [lien CV.pdf]";
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (args[0] === "projects") {
        isRoot = false;
        return "Changement de répertoire vers 'projects'";
      } else if (args[0] === "contact") {
        isRoot = false;
        return "Changement de répertoire vers 'contact'";
      }
      return "Répertoire non trouvé.";
    }
  };

  commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = commandInput.value;
      commandInput.value = "";
      output.innerHTML += `<span class="prompt">${prompt}</span><span class="command">${command}</span><br>`;
      executeCommand(command);
    }
  });

  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];
    if (commands[cmd]) {
      output.innerHTML += `<span class="output">${commands[cmd](args)}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }
    output.scrollTop = output.scrollHeight; // Scroll down
    prompt = "root@guest:~# "; // Réinitialiser le prompt après chaque commande
  }
});
