import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";



// Configuración de Supabase
const supabaseUrl = "https://jorearjeewerukfsvexk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcmVhcmplZXdlcnVrZnN2ZXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzOTg4NzMsImV4cCI6MjA1ODk3NDg3M30.JSM52mjc5h1ZfGDGupzOxZIQ_KHO_RYhQd_Fb-a3MVM";
const supabase = createClient(supabaseUrl, supabaseKey);


// Validar correo electrónico
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Registrar usuario
async function registerUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Usuario registrado exitosamente. Inicia sesión.');
        return true;
    } catch (error) {
        alert('Error al registrar: ' + error.message);
        return false;
    }
}

// Iniciar sesión
async function login(username, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
        if (error) throw error;
        alert('Inicio de sesión exitoso.');
        return true;
    } catch (error) {
        alert('Error: Usuario o contraseña incorrectos.');
        return false;
    }
}

// Manejar eventos del DOM
window.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");
    const mainContainer = document.getElementById("main-container");
    const menuContainer = document.getElementById("menu-container");
    
    // Formulario de registro
    document.getElementById("register-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();
        
        if (!validateEmail(email) || password.length < 6) {
            alert("Correo inválido o contraseña muy corta.");
            return;
        }
        
        if (await registerUser(email, password)) {
            registerContainer.style.display = "none";
            loginContainer.style.display = "block";
        }
    });

    // Formulario de login
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (await login(username, password)) {
            loginContainer.style.display = "none";
            mainContainer.style.display = "block";
        }
    });

    // Alternar vistas
    document.getElementById("show-register").addEventListener("click", (event) => {
        event.preventDefault();
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    });

    document.getElementById("show-login").addEventListener("click", (event) => {
        event.preventDefault();
        registerContainer.style.display = "none";
        loginContainer.style.display = "block";
    });

    // Logout
    document.getElementById("logout").addEventListener("click", () => {
        mainContainer.style.display = "none";
        loginContainer.style.display = "block";
    });

    // Escanear QR
    document.getElementById("scan-qr").addEventListener("click", () => {
        const datosQR = {
            nombre: "Jesús Lopez Pérez",
            matricula: "2003331",
            carrera: "Ingeniería en Tecnología de Software"
        };
        document.getElementById("nombre").value = datosQR.nombre;
        document.getElementById("matricula").value = datosQR.matricula;
        document.getElementById("carrera").value = datosQR.carrera;
        document.getElementById("hora-llegada").value = new Date().toLocaleTimeString();
        document.getElementById("info-form").style.display = "block";
    });

    // Manejar formulario de información
    document.getElementById("info-form").addEventListener("submit", (event) => {
        event.preventDefault();
        mainContainer.style.display = "none";
        menuContainer.style.display = "block";
    });

    // Otras funciones del menú
    document.getElementById("nueva-entrada").addEventListener("click", () => {
        menuContainer.style.display = "none";
        document.getElementById("info-form").reset();
        document.getElementById("info-form").style.display = "none";
        mainContainer.style.display = "block";
    });

    document.getElementById("ver-bd").addEventListener("click", () => {
        alert("Funcionalidad en desarrollo: Ver base de datos");
    });

    document.getElementById("generar-reporte").addEventListener("click", () => {
        alert("Funcionalidad en desarrollo: Generar reporte");
    });

    document.getElementById("logout-menu").addEventListener("click", () => {
        menuContainer.style.display = "none";
        loginContainer.style.display = "block";
    });
});

