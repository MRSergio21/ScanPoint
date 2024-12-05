"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.getElementById("login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault(); // Evitar recarga de la página
        const email = (_a = document.getElementById("email")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = document.getElementById("password")) === null || _b === void 0 ? void 0 : _b.value;
        try {
            const response = yield fetch("http://localhost:3002/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Inicio de sesión exitoso.");
                localStorage.setItem("token", data.token);
                location.href = "/views/impresoras.html";
            }
            else {
                alert(`Error: ${data.message || "Credenciales incorrectas."}`);
            }
        }
        catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    });
});
// Escuchar el evento de submit en el formulario de registro
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault(); // Evitar recarga de la página
            // Obtener valores de los campos del formulario
            const user = document.getElementById("user").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                // Realizar la solicitud al backend
                const response = yield fetch("http://localhost:3002/auth/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user, email, password }), // Enviar los datos en formato JSON
                });
                const data = yield response.json(); // Parsear la respuesta JSON
                if (response.ok) {
                    alert("Registro exitoso.");
                    console.log(data); // Manejar redirección o lógica adicional si es necesario
                    location.href = "/views/index.html";
                }
                else {
                    alert(`Error: ${data.message || "No se pudo realizar el registro."}`);
                }
            }
            catch (error) {
                console.log(error);
                console.error("Error al registrarse:", error);
                alert("Error al registrarse");
            }
        });
    });
}
