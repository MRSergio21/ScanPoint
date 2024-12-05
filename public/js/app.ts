document.getElementById("login-form")?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar recarga de la página
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;

    try {
        const response = await fetch("http://localhost:3002/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert("Inicio de sesión exitoso.");
            localStorage.setItem("token", data.token);
            location.href = "/views/impresoras.html";
        } else {
            alert(`Error: ${data.message || "Credenciales incorrectas."}`);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
});

// Escuchar el evento de submit en el formulario de registro
const registerForm = document.getElementById("register-form") as HTMLFormElement | null;

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evitar recarga de la página

        // Obtener valores de los campos del formulario
        const user = (document.getElementById("user") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            // Realizar la solicitud al backend
            const response = await fetch("http://localhost:3002/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, email, password }), // Enviar los datos en formato JSON
            });

            const data = await response.json(); // Parsear la respuesta JSON
            if (response.ok) {
                alert("Registro exitoso.");
                console.log(data); // Manejar redirección o lógica adicional si es necesario
                location.href = "/views/index.html";
            } else {
                alert(`Error: ${data.message || "No se pudo realizar el registro."}`);
            }
        } catch (error) {
            console.error("Error al registrarse:", error);
            alert("Ocurrió un error al conectarse con el servidor.");
        }
    });
}