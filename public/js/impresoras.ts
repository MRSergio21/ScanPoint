// Interfaz para definir el tipo de datos de una impresora
interface Impresora {
    _id: string;
    marca: string;
    modelo: string;
    fechaCompra: string;
}

if(localStorage.getItem("token") === null) {
    alert("No has iniciado sesión.");
    window.location.href = "index.html";
    throw new Error("No has iniciado sesión.");
}

// Selección de elementos HTML
const printerTableBody = document.getElementById("printer-table-body") as HTMLElement;
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
const createPrinterForm = document.getElementById("createPrinterForm") as HTMLFormElement;
const editPrinterForm = document.getElementById("editPrinterForm") as HTMLFormElement;
const filterInput = document.getElementById("filterInput") as HTMLInputElement;
const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;

let impresorasData: Impresora[] = [];

// Función para obtener las impresoras desde el backend
// Función para obtener las impresoras desde el backend
async function fetchImpresoras() {
    try {
        const response = await fetch("http://localhost:3002/impresora", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) {
            throw new Error("Error al obtener las impresoras");
        }

        impresorasData = await response.json(); // Guardar datos globalmente
        renderImpresoras(impresorasData);
    } catch (error) {
        console.error("Error al obtener las impresoras:", error);
        alert("No se pudieron cargar las impresoras.");
    }
}

// Función para renderizar las impresoras en la tabla
function renderImpresoras(impresoras: Impresora[]) {
    printerTableBody.innerHTML = ""; // Limpiar la tabla
    impresoras.forEach((impresora) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${impresora.marca}</td>
            <td>${impresora.modelo}</td>
            <td>${impresora.fechaCompra}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${impresora._id}" data-bs-toggle="modal" data-bs-target="#editPrinterModal">Editar</button>
                <button class="btn btn-danger btn-sm delete-button" data-id="${impresora._id}">Eliminar</button>
            </td>
        `;
        printerTableBody.appendChild(row);
    });

    // Añadir eventos a los botones de editar y eliminar
    setupActionButtons();
}

// Función para configurar eventos en los botones de acción
function setupActionButtons() {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = (button as HTMLElement).getAttribute("data-id");
            if (id) {
                handleEditImpresora(id);
            }
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = (button as HTMLElement).getAttribute("data-id");
            if (id && confirm("¿Estás seguro de eliminar esta impresora?")) {
                handleDeleteImpresora(id);
            }
        });
    });
}

// Funcionalidad: Filtrar impresoras por marca
if (filterInput) {
    filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase();
        const filteredImpresoras = impresorasData.filter((impresora) =>
            impresora.marca.toLowerCase().includes(query)
        );
        renderImpresoras(filteredImpresoras);
    });
}

// Funcionalidad: Ordenar impresoras por fecha de compra
function sortByFechaCompra() {
    const sortedImpresoras = [...impresorasData].sort((a, b) =>
        new Date(a.fechaCompra).getTime() - new Date(b.fechaCompra).getTime()
    );
    renderImpresoras(sortedImpresoras);
}

// Funcionalidad: Descargar en formato JSON
if (downloadButton) {
    downloadButton.addEventListener("click", () => {
        const dataStr = JSON.stringify(impresorasData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "impresoras.json";
        link.click();
        URL.revokeObjectURL(url);
    });
}

// Función para manejar el cierre de sesión
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token"); // Eliminar el token
        alert("Sesión cerrada.");
        window.location.href = "index.html"; // Redirigir al login
    });
}

// Funcionalidad: Filtrar impresoras por marca
if (filterInput) {
    filterInput.addEventListener("input", () => {
        const query = filterInput.value.toLowerCase();
        const filteredImpresoras = impresorasData.filter((impresora) =>
            impresora.marca.toLowerCase().includes(query)
        );
        renderImpresoras(filteredImpresoras);
    });
}

// Función para manejar el formulario de creación
if (createPrinterForm) {
    createPrinterForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const marca = (document.getElementById("createMarca") as HTMLInputElement).value;
        const modelo = (document.getElementById("createModelo") as HTMLInputElement).value;
        const fechaCompra = (document.getElementById("createFecha") as HTMLInputElement).value;

        try {
            const response = await fetch("http://localhost:3002/impresora", {
                method: "POST",
                headers: { "Content-Type": "application/json" ,
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ marca, modelo, fechaCompra }),
            });

            if (response.ok) {
                alert("Impresora creada con éxito.");
                fetchImpresoras(); // Recargar la tabla
                const modalElement = document.querySelector("#createPrinterModal") as HTMLElement;
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance?.hide();
            } else {
                throw new Error("Error al crear la impresora.");
            }
        } catch (error) {
            console.error("Error al crear la impresora:", error);
            alert("No se pudo crear la impresora.");
        }
    });
}

// Función para manejar la edición de una impresora
async function handleEditImpresora(id: string) {
    try {
        // Obtener los datos de la impresora seleccionada
        const response = await fetch(`http://localhost:3002/impresora/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de la impresora.");
        }

        const impresora: Impresora = await response.json();

        // Rellenar el formulario con los datos de la impresora
        (document.getElementById("editMarca") as HTMLInputElement).value = impresora.marca;
        (document.getElementById("editModelo") as HTMLInputElement).value = impresora.modelo;
        (document.getElementById("editFecha") as HTMLInputElement).value = impresora.fechaCompra;

        // Guardar el ID en un atributo oculto
        (document.getElementById("editPrinterForm") as HTMLFormElement).setAttribute("data-id", id);
    } catch (error) {
        console.error("Error al cargar los datos de la impresora:", error);
        alert("No se pudieron cargar los datos de la impresora.");
    }
}

// Función para manejar el formulario de edición
if (editPrinterForm) {
    editPrinterForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Obtener los datos del formulario
        const id = editPrinterForm.getAttribute("data-id");
        const marca = (document.getElementById("editMarca") as HTMLInputElement).value;
        const modelo = (document.getElementById("editModelo") as HTMLInputElement).value;
        const fechaCompra = (document.getElementById("editFecha") as HTMLInputElement).value;

        try {
            // Realizar la solicitud al backend para actualizar los datos
            const response = await fetch(`http://localhost:3002/impresora/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ marca, modelo, fechaCompra }),
            });

            if (response.ok) {
                alert("Impresora actualizada con éxito.");
                fetchImpresoras(); // Recargar la tabla
            } else {
                throw new Error("Error al actualizar la impresora.");
            }
        } catch (error) {
            console.error("Error al actualizar la impresora:", error);
            alert("No se pudo actualizar la impresora.");
        }

        // Cerrar el modal y resetear el formulario
        const modalElement = document.querySelector("#editPrinterModal") as HTMLElement;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance?.hide();
        editPrinterForm.reset();
    });
}

// Resetear el formulario al cerrar el modal de edición
const editPrinterModal = document.getElementById("editPrinterModal");
if (editPrinterModal) {
    editPrinterModal.addEventListener("hidden.bs.modal", () => {
        editPrinterForm.reset();
    });
}


// Función para manejar la eliminación de una impresora
async function handleDeleteImpresora(id: string) {
    try {
        const response = await fetch(`http://localhost:3002/impresora/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        if (response.ok) {
            alert("Impresora eliminada con éxito.");
            fetchImpresoras(); // Recargar la tabla
        } else {
            throw new Error("Error al eliminar la impresora.");
        }
    } catch (error) {
        console.error("Error al eliminar la impresora:", error);
        alert("No se pudo eliminar la impresora.");
    }
}

// Inicializar la tabla al cargar la página
fetchImpresoras();
