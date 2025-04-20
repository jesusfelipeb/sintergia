"use client";  // Necesario en Next.js 13+ para manejar estado en App Router
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);
                router.push("/dashboard"); // Redirige tras el login
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-black font-bold mb-4">Iniciar Sesión</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <input 
                    type="username" 
                    placeholder="Usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="border p-2 rounded w-full mb-2 text-gray-700"
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border p-2 rounded w-full mb-2 text-gray-700"
                />
                <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
