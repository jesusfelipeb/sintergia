"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            router.push("/auth"); // Si no hay token, redirige a login
        } else {
            setUser({ username: "Felipe" }); // Simulación de usuario
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Bienvenido al Dashboard Sintergicos!</h1>
            {user && <p className="mt-2">Usuario: {user.username}</p>}
        </div>
    );
};

export default Dashboard;
