const textarea = document.getElementById("prompt-textarea");

// bouton qui ouvre application 
const openButton = document.createElement("button");
openButton.id = "openButton"
openButton.innerText = "Shortcuts";
document.body.appendChild(openButton);

let shortcutContainer; // Déclarer la variable en dehors de la portée de la fonction click
let isDraggingShortcut;

openButton.addEventListener("click", () => {
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const rectangle = document.createElement("div");
    rectangle.id = "rectangle";

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
    closeButton.id = "closeButton";
    closeButton.innerHTML = "&#10006;"; // Utiliser le code HTML pour afficher une croix
    closeButton.addEventListener("click", () => {
        rectangle.remove();
        shortcutContainer = null;
        openButton.style.display = "block";
    });

    rectangle.appendChild(closeButton);

    if (!shortcutContainer) {
        shortcutContainer = document.createElement("div");
        shortcutContainer.id = "shortcutContainer";
        loadButtons(shortcutContainer);

        shortcutContainer.addEventListener("mousedown", () => {
            isDraggingShortcut = true;
        });
    }

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "10px";
    buttonsContainer.style.marginTop = "10px";

    const addButton = document.createElement("button");
    addButton.id = "addButton";
    addButton.innerText = "Add";

    var addingShortcut = false;
    addButton.addEventListener("click", () => {
        if (shortcutContainer.children.length < 5 && !addingShortcut) {
            addingShortcut = true;
            const addShortcutContainer = document.createElement("div");
            addShortcutContainer.style.display = "flex";
            addShortcutContainer.style.flexDirection = "column";
            addShortcutContainer.style.gap = "10px";
            addShortcutContainer.style.alignItems = "center";

            const shortcutNameInput = document.createElement("input");
            shortcutNameInput.id = "shortcutNameInput";
            shortcutNameInput.type = "text";
            shortcutNameInput.placeholder = "Enter a name";
            addShortcutContainer.appendChild(shortcutNameInput);

            const buttonContainer = document.createElement("div");
            buttonContainer.style.display = "flex";
            buttonContainer.style.gap = "10px";

            const cancelButton = document.createElement("button");
            cancelButton.id = "cancelButton";
            cancelButton.innerText = "Cancel";
            cancelButton.addEventListener("click", () => {
                addShortcutContainer.remove();
                addingShortcut = false;
            });
            buttonContainer.appendChild(cancelButton);

            const confirmButton = document.createElement("button");
            confirmButton.id = "confirmButton";
            confirmButton.innerText = "Confirm";
            confirmButton.addEventListener("click", () => {
                const shortcutName = shortcutNameInput.value;
                const value = textarea.value;
                if (shortcutName !== "") {
                    const newShortcut = createShortcutElement(shortcutName, value);
                    const listItem = createListItemElement(newShortcut);
                    shortcutContainer.appendChild(listItem);
                    saveShortcuts(shortcutContainer);
                    addShortcutContainer.remove();
                    addingShortcut = false;
                } else {
                    alert("Please enter a name for the shortcut.");
                }
            });
            buttonContainer.appendChild(confirmButton);

            addShortcutContainer.appendChild(buttonContainer);

            rectangle.appendChild(addShortcutContainer);
        } else if (!addingShortcut) {
            alert("Vous avez atteint la limite de 5 raccourcis. Veuillez supprimer un raccourci existant avant d'en ajouter un nouveau.");
        }
    });

    const trashContainer = document.createElement("button");
    trashContainer.id = "trashContainer";
    trashContainer.innerText = "Trash";
    makeTrashContainerDroppable(trashContainer);

    rectangle.id = "rectangle";
    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(trashContainer);
    rectangle.appendChild(shortcutContainer);
    rectangle.appendChild(buttonsContainer);
    document.body.appendChild(rectangle);

    openButton.style.display = "none";
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
    const newShortcut = document.createElement("button");
    newShortcut.className = "shortcut";
    newShortcut.innerText = buttonName;
    newShortcut.dataset.value = value; // Stocker la valeur dans l'attribut "data-value"
    newShortcut.id = "button-" + Math.random().toString(36).substr(2, 9);
    newShortcut.addEventListener("click", () => {
        textarea.value = value;
    });

    makeButtonDraggable(newShortcut);

    return newShortcut;
}

function createListItemElement(buttonElement) {
    const listItem = document.createElement("div");
    listItem.classList.add("item", "flex-item");
    listItem.appendChild(buttonElement);
    listItem.id = "button-" + Math.random().toString(36).substr(2, 9);
    makeButtonDraggable(listItem);
    return listItem;
}
