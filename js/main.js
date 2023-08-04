// Función para cargar los turnos desde el almacenamiento local
function loadTurnsFromLocalStorage() {
    const turns = localStorage.getItem("turns");
    return turns ? JSON.parse(turns) : [];
}

// Función para guardar los turnos en el almacenamiento local
function saveTurnsToLocalStorage(turns) {
    localStorage.setItem("turns", JSON.stringify(turns));
}

// Función para cargar los turnos desde un archivo JSON
function loadTurnsFromJSONFile() {
    return new Promise((resolve, reject) => {
        fetch("turns.json")
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Función para mostrar los turnos en la interfaz
function displayTurns(turns) {
    const scheduleList = document.getElementById("scheduleList");
    scheduleList.innerHTML = "";

    turns.forEach(turn => {
        const li = document.createElement("li");
        li.textContent = `Empleado: ${turn.employee}, Turno: ${turn.shift}`;
        scheduleList.appendChild(li);
    });
}

// Manejador de evento para el formulario de registro
function onTurnFormSubmit(event) {
    event.preventDefault();

    const employeeInput = document.getElementById("employee");
    const shiftInput = document.getElementById("shift");

    const newTurn = {
        employee: employeeInput.value,
        shift: shiftInput.value
    };

    let turns = loadTurnsFromLocalStorage();
    turns.push(newTurn);
    saveTurnsToLocalStorage(turns);

    displayTurns(turns);

    employeeInput.value = "";
    shiftInput.value = "";
}

// Agregar evento al formulario de registro
const turnForm = document.getElementById("turnForm");
turnForm.addEventListener("submit", onTurnFormSubmit);

// Cargar y mostrar los turnos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadTurnsFromJSONFile()
        .then(initialTurns => {
            saveTurnsToLocalStorage(initialTurns);
            displayTurns(initialTurns);
        })
        .catch(error => console.error("Error al cargar los turnos:", error));
});