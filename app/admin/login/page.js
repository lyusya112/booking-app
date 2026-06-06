"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  const router = useRouter();

  function login(e) {
    e.preventDefault();

    if (password === "123456") {
      localStorage.setItem("admin", "true");

      router.push("/admin");
    } else {
      alert("Неверный пароль");
    }
  }

  return (
    <main
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Вход в админку</h1>

      <form
        onSubmit={login}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Войти
        </button>
      </form>
    </main>
  );
}