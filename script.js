document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const commandInput = document.getElementById("command");

  // Nom du repo GitHub Pages
  const githubBaseURL = "https://sufanaccount.github.io/CV"; // Remplace par ton vrai URL GitHub Pages

  // Variables d'état
  let currentDirectory = "CV"; 
  const files = ["cv.pdf"];
  const directories = ["projects", "contact"]; 
  const commandsList = ["ls", "cd", "cat", "wget", "clear"];

  // Introduction avant le shell
  const introText = `Bienvenue sur mon CV interactif en ligne !\n\n
Tapez 'ls' pour voir les fichiers disponibles.\n
Tapez 'cd projects' pour voir mes projets.\n
Tapez 'cat cv.pdf' pour afficher mon CV directement.\n
Tapez 'wget cv.pdf' pour télécharger mon CV.\n\n
Prêt à commencer ? Tapez une commande...\n`;

  output.innerHTML = `<span class="intro-text">${introText}</span>`;

  let prompt = "CV@guest:~# "; 

  // Liste des commandes
  const commands = {
    ls: () => {
      if (currentDirectory === "CV") {
        return `${directories.join("  ")}  ${files.join("  ")}`;
      }
      return "Aucun fichier ici.";
    },
    cat: (args) => {
      if (!args[0]) return "Veuillez spécifier un fichier.";
      if (args[0] === "cv.pdf" && currentDirectory === "CV") {
        fetch(`${githubBaseURL}/cv.pdf`)
          .then(response => response.text())
          .then(text => {
            output.innerHTML += `<pre class="output">${text}</pre><br>`;
          })
          .catch(() => {
            output.innerHTML += `<span class="output">Erreur : Impossible d'afficher cv.pdf</span><br>`;
          });
        return "Affichage du contenu de cv.pdf...";
      }
      return "Fichier non trouvé.";
    },
    wget: (args) => {
      if (!args[0]) return "Veuillez spécifier un fichier.";
      if (args[0] === "cv.pdf" && currentDirectory === "CV") {
        window.location.href = `${githubBaseURL}/cv.pdf`;
        return "Téléchargement de cv.pdf...";
      }
      return "Fichier non trouvé.";
    },
    cd: (args) => {
      if (!args[0]) return "Veuillez spécifier un répertoire.";
      if (directories.includes(args[0])) {
        output.innerHTML += `<span class="output">Accès à '${args[0]}'...</span><br>`;
        setTimeout(() => {
          window.location.href = `${githubBaseURL}/${args[0]/index.html}`;
        }, 1000);
        return "";
      }
      return "Répertoire non trouvé.";
    },
    clear: () => {
      output.innerHTML = "";
      return "";
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
    if (e.key === "Tab") {
      e.preventDefault();
      autocomplete(commandInput);
    }
  });

  function executeCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];

    if (commands[cmd]) {
      const result = commands[cmd](args.slice(1));
      if (result) output.innerHTML += `<span class="output">${result}</span><br>`;
    } else {
      output.innerHTML += `<span class="output">Commande inconnue: ${cmd}</span><br>`;
    }

    output.scrollTop = output.scrollHeight; 
  }

  // Fonction d'auto-complétion
  function autocomplete(input) {
    const value = input.value.trim();
    if (!value) return;

    let suggestions = [...commandsList, ...directories, ...files].filter(item => item.startsWith(value));

    if (suggestions.length === 1) {
      input.value = suggestions[0] + " ";
    } else if (suggestions.length > 1) {
      output.innerHTML += `<span class="output">${suggestions.join("  ")}</span><br>`;
    }
  }
});
