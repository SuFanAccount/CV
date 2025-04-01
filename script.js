document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  let isRoot = true;

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
      output.innerHTML += `<span class="command">> ${command}</span><br>`;
      executeCommand(command);
    }
  });

  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];
    if (commands[cmd]) {
      output.innerHTML += `${commands[cmd](args)}<br>`;
    } else {
      output.innerHTML += `Commande inconnue: ${cmd}<br>`;
    }
    output.scrollTop = output.scrollHeight; // Scrolling
  }
});
