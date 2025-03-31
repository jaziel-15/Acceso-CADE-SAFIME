import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para manejar el inicio de sesión
async function login(email, password) {
    try {
        // Intenta autenticar al usuario con Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('Credenciales incorrectas. Por favor verifica tu usuario y contraseña.');
            console.error('Error al iniciar sesión:', error.message);
            return false;
        } else {
            alert('Inicio de sesión exitoso');
            return true;
        }
    } catch (err) {
        console.error('Error inesperado:', err);
        alert('Ocurrió un error inesperado. Intenta nuevamente.');
        return false;
    }
}

// Validación del formulario antes de enviar
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        alert("Por favor llena todos los campos.");
        return;
    }

    // Intentar iniciar sesión
    const loggedIn = await login(email, password);
    if (loggedIn) {
        // Ocultar formulario de inicio de sesión y mostrar el contenido principal
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    }
});
