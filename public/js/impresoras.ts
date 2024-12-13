const getUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken;
}
const jwtDecode = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
        return null;
    }
}
// Interfaz para definir el tipo de datos de una impresora
interface Impresora {
    _id: string;
    marca: string;
    modelo: string;
    fechaCompra: string;
    createdBy?: {
        user: string;
        email: string;
    };
}

// Verificar si el token está disponible
const token = localStorage.getItem("token");
if (!token) {
    alert("No has iniciado sesión.");
    window.location.href = "index.html";
    throw new Error("No has iniciado sesión.");
}

async function checkAuthentication() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No tienes acceso. Por favor, inicia sesión.");
        window.location.href = "index.html";
        return;
    }

    try {
        // Verificar token con el servidor
        const response = await fetch("http://localhost:3002/validate-token", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Token inválido");
        }
    } catch (error) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token"); // Limpiar token inválido
        window.location.href = "index.html";
    }
}


// Selección de elementos HTML
const printerTableBody = document.getElementById("printer-table-body") as HTMLElement;
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;
const createPrinterForm = document.getElementById("createPrinterForm") as HTMLFormElement;
const editPrinterForm = document.getElementById("editPrinterForm") as HTMLFormElement;
const filterInput = document.getElementById("filterInput") as HTMLInputElement;
const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;
const createButton = document.getElementById("create-printer-button") as HTMLButtonElement;
const sortByDateButton = document.getElementById("sort-by-date-button") as HTMLButtonElement;

let impresorasData: Impresora[] = [];

// Función para obtener las impresoras desde el backend
async function fetchImpresoras() {
    try {
        console.log("Fetching printers...");
        const response = await fetch("http://localhost:3002/impresora", {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error en la respuesta del servidor:", errorResponse);
            throw new Error(`Error al obtener las impresoras: ${response.status} ${response.statusText}`);
        }

        impresorasData = await response.json(); // Guardar datos globalmente
        console.log("Datos obtenidos:", impresorasData);
        renderImpresoras(impresorasData);
    } catch (error) {
        console.error("Error al obtener las impresoras:", error);
        alert("No se pudieron cargar las impresoras. Verifica tu conexión o contacta al administrador.");
    }
}

// Función para renderizar las impresoras en la tabla
function renderImpresoras(impresoras: Impresora[]) {
    printerTableBody.innerHTML = ""; // Limpiar la tabla
    if (impresoras.length === 0) {
        printerTableBody.innerHTML = `<tr><td colspan="4">No se encontraron impresoras.</td></tr>`;
        return;
    }

    impresoras.forEach((impresora) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${impresora.marca}</td>
            <td>${impresora.modelo}</td>
            <td>${impresora.fechaCompra}</td>
            <td>${impresora.createdBy?.user || ""}</td>
            <td>
                <button class="action-button update-button" data-id="${impresora._id}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button class="action-button delete-button" data-id="${impresora._id}"><i class="fa-solid fa-trash"></i> Eliminar</button>
            </td>
        `;
        printerTableBody.appendChild(row);
    });

    // Añadir eventos a los botones de editar y eliminar
    setupActionButtons();
}

// Función para configurar eventos en los botones de acción
function setupActionButtons() {
    // Selecciona todos los botones de edición
    const editButtons = document.querySelectorAll(".update-button");
    if (editButtons.length === 0) {
        console.warn("No se encontraron botones de edición.");
    } else {
        editButtons.forEach((button) => {
            button.removeEventListener("click", handleEditClick); // Evita duplicar eventos
            button.addEventListener("click", handleEditClick);
        });
    }

    // Selecciona todos los botones de eliminación
    const deleteButtons = document.querySelectorAll(".delete-button");
    if (deleteButtons.length === 0) {
        console.warn("No se encontraron botones de eliminación.");
    } else {
        deleteButtons.forEach((button) => {
            button.removeEventListener("click", handleDeleteClick); // Evita duplicar eventos
            button.addEventListener("click", handleDeleteClick);
        });
    }
}

// Función manejadora para clic en editar
function handleEditClick(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const id = button.getAttribute("data-id");
    if (id) {
        handleEditImpresora(id); // Llama a la función para manejar edición
        openModal("editPrinterModal");
    } else {
        console.error("ID no encontrado en el botón de edición.");
    }
}

// Función manejadora para clic en eliminar
function handleDeleteClick(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const id = button.getAttribute("data-id");
    if (id && confirm("¿Estás seguro de eliminar esta impresora?")) {
        handleDeleteImpresora(id); // Llama a la función para manejar eliminación
    } else if (!id) {
        console.error("ID no encontrado en el botón de eliminación.");
    }
}

// Función para manejar el formulario de creación
if (createPrinterForm) {
    createPrinterForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const marca = (document.getElementById("createMarca") as HTMLInputElement).value.trim();
        const modelo = (document.getElementById("createModelo") as HTMLInputElement).value.trim();
        const fechaCompra = (document.getElementById("createFecha") as HTMLInputElement).value;

        if (!marca || !modelo || !fechaCompra) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            console.log("Creando impresora...");
            const response = await fetch("http://localhost:3002/impresora", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ marca, modelo,fechaCompra, createdBy: getUserData()?.user._id }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Error al crear impresora:", errorResponse);
                throw new Error(`Error al crear la impresora: ${response.status} ${response.statusText}`);
            }

            alert("Impresora creada con éxito.");
            fetchImpresoras(); // Recargar la tabla
            closeModal("createPrinterModal");

            // Reset input values
            (document.getElementById("createMarca") as HTMLInputElement).value = "";
            (document.getElementById("createModelo") as HTMLInputElement).value = "";
            (document.getElementById("createFecha") as HTMLInputElement).value = "";
        } catch (error) {
            console.error("Error al crear la impresora:", error);
            alert("No se pudo crear la impresora. Verifica tu conexión o los datos ingresados.");
        }
    });
}

// Función para manejar la edición de una impresora
async function handleEditImpresora(id: string) {
    try {
        console.log(`Obteniendo datos de la impresora con ID: ${id}`);
        const response = await fetch(`http://localhost:3002/impresora/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos de la impresora.");
        }

        const impresora: Impresora = await response.json();
        (document.getElementById("editMarca") as HTMLInputElement).value = impresora.marca;
        (document.getElementById("editModelo") as HTMLInputElement).value = impresora.modelo;
        (document.getElementById("editFecha") as HTMLInputElement).value = impresora.fechaCompra;

        editPrinterForm.setAttribute("data-id", id);
    } catch (error) {
        console.error("Error al cargar los datos de la impresora:", error);
        alert("No se pudieron cargar los datos de la impresora.");
    }
}

// Función para manejar el formulario de edición
if (editPrinterForm) {
    editPrinterForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const id = editPrinterForm.getAttribute("data-id");
        const marca = (document.getElementById("editMarca") as HTMLInputElement).value.trim();
        const modelo = (document.getElementById("editModelo") as HTMLInputElement).value.trim();
        const fechaCompra = (document.getElementById("editFecha") as HTMLInputElement).value;

        if (!id) {
            console.error("No se encontró el ID para actualizar la impresora.");
            return;
        }

        try {
            console.log(`Actualizando impresora con ID: ${id}`);
            const response = await fetch(`http://localhost:3002/impresora/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ marca, modelo, fechaCompra}),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la impresora.");
            }

            alert("Impresora actualizada con éxito.");
            fetchImpresoras(); // Recargar la tabla
            closeModal("editPrinterModal");

            // Reset input values
            (document.getElementById("editMarca") as HTMLInputElement).value = "";
            (document.getElementById("editModelo") as HTMLInputElement).value = "";
            (document.getElementById("editFecha") as HTMLInputElement).value = "";
        } catch (error) {
            console.error("Error al actualizar la impresora:", error);
            alert("No se pudo actualizar la impresora.");
        }
    });
}

// Función para manejar la eliminación de una impresora
async function handleDeleteImpresora(id: string) {
    try {
        console.log(`Eliminando impresora con ID: ${id}`);
        const response = await fetch(`http://localhost:3002/impresora/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la impresora.");
        }

        alert("Impresora eliminada con éxito.");
        fetchImpresoras(); // Recargar la tabla
    } catch (error) {
        console.error("Error al eliminar la impresora:", error);
        alert("No se pudo eliminar la impresora.");
    }
}

// Función para abrir el modal
function openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("show");
    } else {
        console.error(`Modal con ID ${modalId} no encontrado.`);
    }
}

// Función para cerrar el modal
function closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("show");
    } else {
        console.error(`Modal con ID ${modalId} no encontrado.`);
    }
}

// Evento para abrir el modal de creación
if (createButton) {
    createButton.addEventListener("click", () => openModal("createPrinterModal"));
}

// Función para cerrar sesión
function handleLogout() {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");

    // Notificar al usuario
    alert("Sesión cerrada correctamente.");

    // Redirigir a la página de inicio de sesión
    window.location.href = "index.html";
}

// Agregar evento al botón de cerrar sesión
if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
} else {
    console.error("Botón de cerrar sesión no encontrado.");
}

// Función para filtrar impresoras por nombre
function filterPrinters() {
    const query = filterInput.value.trim().toLowerCase(); // Convertir el texto ingresado a minúsculas
    const filteredPrinters = impresorasData.filter((impresora) =>
        impresora.marca.toLowerCase().includes(query) || // Coincidencia en marca
        impresora.modelo.toLowerCase().includes(query)   // Coincidencia en modelo
    );

    // Renderizar impresoras filtradas
    renderImpresoras(filteredPrinters);

    // Mensaje si no hay coincidencias
    if (filteredPrinters.length === 0) {
        printerTableBody.innerHTML = `<tr><td colspan="4">No se encontraron coincidencias.</td></tr>`;
    }
}

// Asociar el evento `input` al campo de filtro
if (filterInput) {
    filterInput.addEventListener("input", filterPrinters);
} else {
    console.error("Campo de entrada para el filtro no encontrado.");
}

// Función para descargar datos como JSON
function downloadTableAsJSON() {
    if (!impresorasData || impresorasData.length === 0) {
        alert("No hay datos disponibles para descargar.");
        return;
    }

    // Convertir los datos en una cadena JSON
    const dataStr = JSON.stringify(impresorasData, null, 2); // Formato legible con sangría

    // Crear un blob con los datos JSON
    const blob = new Blob([dataStr], { type: "application/json" });

    // Crear una URL para el blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal para la descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = "impresoras.json";

    // Simular un clic en el enlace para iniciar la descarga
    link.click();

    // Liberar la URL del blob
    URL.revokeObjectURL(url);
}

// Asociar el evento `click` al botón de descarga
if (downloadButton) {
    downloadButton.addEventListener("click", downloadTableAsJSON);
} else {
    console.error("Botón de descarga no encontrado.");
}

// Función para ordenar las impresoras por fecha de compra
function sortPrintersByDate() {
    if (!impresorasData || impresorasData.length === 0) {
        alert("No hay datos disponibles para ordenar.");
        return;
    }

    // Ordenar las impresoras por fecha de compra
    impresorasData.sort((a, b) => {
        const dateA = new Date(a.fechaCompra).getTime(); // Convertir fecha a timestamp
        const dateB = new Date(b.fechaCompra).getTime(); // Convertir fecha a timestamp
        return dateA - dateB; // Cambia a "dateB - dateA" si quieres orden descendente
    });

    // Renderizar las impresoras ordenadas
    renderImpresoras(impresorasData);
}

// Inicializar la tabla al cargar la página
fetchImpresoras();