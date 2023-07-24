const textarea = document.getElementById("prompt-textarea");

// bouton qui ouvre application 
const openButton = document.createElement("img");
openButton.src = "data:image/png;base64,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";
openButton.id = "openButton"
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

    const closeButton = document.createElement("img");
    closeButton.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABBklEQVR4nN2VTQrCQAxGBbFncVFXulMP4U/xTuotlHokFXVbsTvR/ZPAFCWknVoV0QcDQzL9EpKZtFb7a4AAmAArYANc3ZJ97HxBVfExcMCPnBk+I1wH5jzPTL4tE6CKeMbMJz7idYZFDdU17wId4GQIia0N9JR9bzbe3QhN2/lCFUT2ofNJAprICiBXUZMCLedvAolhOxrfLa0AW+OgzjZUe6t0wsYKcCGfNMvak3nG5R0BkoLz56+UKC7KnHtZrMZrFl+5poHx0Hqehya+vrLvciesPHNeZ2CKv2nYTQvFH8a1jN7PjGtVrn0J4Z23LHm4xkcyW4C1e4yyZC82+es1Kon/DDdik9w/6UChUgAAAABJRU5ErkJggg==";
    closeButton.id = "closeButton";
    //closeButton.innerHTML = "&#10006;"; // Utiliser le code HTML pour afficher une croix
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

    const addIcon = document.createElement("img");
    addIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQElEQVR4nO3SwQkAQAgDwfTfdO6TAnwoIrdTgARWCbjMwQCRYIt5wiCBpp6r250BVWOHqxhgEoS2mAH+PQGgBg8ZRU7A5GWOeQAAAABJRU5ErkJggg==";

    const addContainer = document.createElement("div");
    addContainer.id = "addContainer";
    addContainer.appendChild(addIcon);

    var addingShortcut = false;
    addContainer.addEventListener("click", () => {
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

    const trashIcon = document.createElement("img");
    trashIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAATklEQVR4nGNgGBHg////Df8xQQe5hlEEGAbcAhAgSTED6erpb8F/EvmjFjCMBhHDaCoagUFECAxKC578Jx08IcUCPxIteQLSQ7QFQwoAAIX8orNLyGYcAAAAAElFTkSuQmCC";
    trashIcon.style.position = "center";

    const trashContainer = document.createElement("div");
    trashContainer.id = "trashContainer";

    trashContainer.appendChild(trashIcon);

    makeTrashContainerDroppable(trashContainer);

    rectangle.id = "rectangle";
    buttonsContainer.appendChild(addContainer);
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
