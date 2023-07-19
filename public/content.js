const textarea = document.getElementById("prompt-textarea");

const customButton = document.createElement("button");
customButton.innerText = "Shortcuts";
customButton.style.position = "fixed";
customButton.style.zIndex = "9999";
customButton.style.padding = "10px";
customButton.style.backgroundColor = "#4e4e4e";
customButton.style.color = "white";
customButton.style.border = "none";
customButton.style.borderRadius = "20px";
customButton.style.cursor = "pointer";
customButton.style.bottom = "100px"; // Marge inférieure
customButton.style.left = "60px"; // Marge gauche
customButton.style.transform = "translate(-50%, -50%)";
document.body.appendChild(customButton);

let shortcutContainer; // Déclarer la variable en dehors de la portée de la fonction click
let isDraggingShortcut;


customButton.addEventListener("click", () => {
    if (document.getElementById("rectangle")) {
        document.getElementById("rectangle").remove();
        shortcutContainer = null; // Réinitialiser la variable lorsque le rectangle est supprimé
    } else {
        const rectangle = document.createElement("div");
        rectangle.style.position = "absolute";
        rectangle.style.width = "200px";
        rectangle.style.height = "300px";
        rectangle.style.overflow = "auto";
        rectangle.style.padding = "10px";
        rectangle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        rectangle.style.display = "flex";
        rectangle.style.flexDirection = "column";
        rectangle.style.justifyContent = "flex-end";
        rectangle.style.alignItems = "center";
        rectangle.style.bottom = "40px"; // Marge inférieure
        rectangle.style.left = "120px";
        rectangle.style.transform = "translate(-50%, -50%)";

        let isDragging = false;
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        rectangle.addEventListener("mousedown", (event) => {
            if (!isDraggingShortcut) { // Vérifier si le raccourci n'est pas en cours de glissement
                isDragging = true;
                dragOffsetX = event.clientX - rectangle.offsetLeft;
                dragOffsetY = event.clientY - rectangle.offsetTop;
            }
        });

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                const x = event.clientX - dragOffsetX;
                const y = event.clientY - dragOffsetY;
                rectangle.style.left = `${x}px`;
                rectangle.style.top = `${y}px`;
            }
        });
    
        document.addEventListener("mouseup", () => {
            isDragging = false;
            isDraggingShortcut = false;
        });

        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&#10006;"; // Utiliser le code HTML pour afficher une croix
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "5px";
        closeButton.style.backgroundColor = "transparent";
        closeButton.style.border = "none";
        closeButton.style.color = "white";
        closeButton.style.fontSize = "18px";
        closeButton.style.cursor = "pointer";
        closeButton.addEventListener("click", () => {
            rectangle.remove();
            shortcutContainer = null;
            customButton.style.display = "block";
        });

        rectangle.appendChild(closeButton);

        if (!shortcutContainer) {
            shortcutContainer = document.createElement("div");
            shortcutContainer.style.gap = "10px";
            shortcutContainer.style.display = "grid";
            shortcutContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";
            loadButtons(shortcutContainer);

            shortcutContainer.addEventListener("mousedown", () => {
                isDraggingShortcut = true;
            });
        }

        const buttonsContainer = document.createElement("div");
        buttonsContainer.style.display = "flex";
        buttonsContainer.style.gap = "10px";
        buttonsContainer.style.marginTop = "10px";

        const addShortcut = document.createElement("button");
        addShortcut.innerText = "Add";
        addShortcut.style.backgroundColor = "gray";
        addShortcut.style.color = "white";
        addShortcut.style.width = "80px";
        addShortcut.style.borderRadius = "20px";
        addShortcut.style.backgroundColor = "#1ca781";
        addShortcut.style.padding = "5px 10px";
        addShortcut.addEventListener("click", () => {
            if (shortcutContainer.children.length < 5) {
                const addShortcutContainer = document.createElement("div");
                addShortcutContainer.style.display = "flex";
                addShortcutContainer.style.flexDirection = "column";
                addShortcutContainer.style.gap = "10px";
                addShortcutContainer.style.alignItems = "center";

                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.style.color = "black";
                nameInput.placeholder = "Enter a name";
                nameInput.style.width = "180px";
                nameInput.style.marginTop = "10px";
                addShortcutContainer.appendChild(nameInput);

                const buttonContainer = document.createElement("div");
                buttonContainer.style.display = "flex";
                buttonContainer.style.gap = "10px";

                const cancelButton = document.createElement("button");
                cancelButton.innerText = "Cancel";
                cancelButton.style.width = "80px";
                cancelButton.style.backgroundColor = "gray";
                cancelButton.style.color = "white";
                cancelButton.style.borderRadius = "20px";
                cancelButton.style.padding = "5px 10px";
                cancelButton.addEventListener("click", () => {
                    addShortcutContainer.remove();
                });
                buttonContainer.appendChild(cancelButton);

                const confirmButton = document.createElement("button");
                confirmButton.innerText = "Confirm";
                confirmButton.style.backgroundColor = "gray";
                confirmButton.style.color = "white";
                confirmButton.style.width = "80px";
                confirmButton.style.borderRadius = "20px";
                confirmButton.style.padding = "5px 10px";
                confirmButton.addEventListener("click", () => {
                    const shortcutName = nameInput.value;
                    const value = textarea.value;
                    if (shortcutName !== "") {
                        const newShortcut = createShortcutElement(shortcutName, value);
                        const listItem = createListItemElement(newShortcut);
                        shortcutContainer.appendChild(listItem);
                        saveShortcuts(shortcutContainer);
                        addShortcutContainer.remove();
                    } else {
                        alert("Please enter a name for the shortcut.");
                    }
                });
                buttonContainer.appendChild(confirmButton);

                addShortcutContainer.appendChild(buttonContainer);

                rectangle.appendChild(addShortcutContainer);
            } else {
                alert("Vous avez atteint la limite de 5 raccourcis. Veuillez supprimer un raccourci existant avant d'en ajouter un nouveau.");
            }
        });

        const trashContainer = document.createElement("button");
        trashContainer.innerText = "Trash";
        trashContainer.style.backgroundColor = "#999a9b";
        trashContainer.style.color = "white";
        trashContainer.style.width = "80px";
        trashContainer.style.borderRadius = "20px";
        trashContainer.style.backgroundColor = "#9E2626";
        trashContainer.style.padding = "5px 10px";
        makeTrashContainerDroppable(trashContainer);

        rectangle.id = "rectangle";
        buttonsContainer.appendChild(addShortcut);
        buttonsContainer.appendChild(trashContainer);
        rectangle.appendChild(shortcutContainer);
        rectangle.appendChild(buttonsContainer);
        document.body.appendChild(rectangle);

        customButton.style.display = "none";
    }
});

async function saveShortcuts(shortcutContainer) {
    const buttons = Array.from(shortcutContainer.children)
        .slice(0, 5) // Limite le nombre de raccourcis à 10
        .map((listItem) => {
            const buttonName = listItem.firstChild.innerText;
            const value = listItem.firstChild.dataset.value;
            return { name: buttonName, value: value };
        });
    await chrome.storage.local.set({ buttons: buttons });
}

async function loadButtons(shortcutContainer) {
    const result = await chrome.storage.local.get(["buttons"]);
    if (result.buttons && result.buttons.length > 0) {
        result.buttons.forEach((buttonInfo) => {
            const newButton = createShortcutElement(buttonInfo.name, buttonInfo.value);
            const listItem = createListItemElement(newButton);
            shortcutContainer.appendChild(listItem);
        });
    }
}

function makeButtonDraggable(buttonElement) {
    buttonElement.draggable = true;
    buttonElement.addEventListener("dragstart", (event) => {
        if (event.target.tagName !== "BUTTON") { // Vérifier si l'élément cliqué n'est pas un bouton
            event.preventDefault(); // Empêcher le déclenchement de l'événement de déplacement
            return;
        }
        event.dataTransfer.setData("text/plain", buttonElement.id); // Définir l'ID de l'élément en cours de déplacement
    });
}

function makeTrashContainerDroppable(trashContainer) {
    trashContainer.draggable = true;
  
    trashContainer.addEventListener("dragover", (event) => {
      event.preventDefault(); // Empêcher le comportement par défaut de l'événement de glisser-déposer
    });
  
    trashContainer.addEventListener("drop", (event) => {
      event.preventDefault(); // Empêcher le comportement par défaut de l'événement de glisser-déposer
  
      const buttonId = event.dataTransfer.getData("text/plain"); // Récupérer l'ID de l'élément glissé
      const button = document.getElementById(buttonId); // Récupérer l'élément bouton correspondant
  
      // Vérifier si l'élément glissé est un raccourci
      if (button && button.classList.contains("item")) {
        button.remove();
        saveShortcuts(shortcutContainer); // Appeler saveShortcuts en passant shortcutContainer pour mettre à jour la base de données
      }
  
      // Réinitialiser l'état de déplacement du rectangle
      isDragging = false;
    });
}

function createShortcutElement(buttonName, value) {
    const newButton = document.createElement("button");
    newButton.innerText = buttonName;
    newButton.style.backgroundColor = "#4e4e4e";
    newButton.style.color = "white";
    newButton.style.padding = "5px 10px";
    newButton.style.marginRight = "5px";
    newButton.style.width = "180px";
    newButton.style.borderRadius = "20px";
    newButton.dataset.value = value; // Stocker la valeur dans l'attribut "data-value"
    newButton.id = "button-" + Math.random().toString(36).substr(2, 9);
    newButton.addEventListener("click", () => {
        textarea.value = value;
    });

    makeButtonDraggable(newButton);

    return newButton;
}

function createListItemElement(buttonElement) {
    const listItem = document.createElement("div");
    listItem.classList.add("item", "flex-item");
    listItem.appendChild(buttonElement);
    listItem.id = "button-" + Math.random().toString(36).substr(2, 9);
    makeButtonDraggable(listItem);
    return listItem;
}
