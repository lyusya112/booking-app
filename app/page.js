"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    comment: "",
  });

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Запись отправлена!");

      setForm({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        comment: "",
      });
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>
          BEAUTY BOOKING
        </div>

        <h1 style={styles.title}>
          Онлайн-запись
        </h1>

        <p style={styles.subtitle}>
          Выберите удобную дату и время
        </p>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Ваше имя"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="Номер телефона"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            style={styles.input}
            value={form.service}
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
          >
            <option value="">
              Выберите услугу
            </option>

            <option>
              оформление бровей
            </option>

            <option>
              макияж любого характера
            </option>
          </select>

          <div style={styles.row}>
            <input
              style={styles.input}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <select
  style={styles.input}
  value={form.time}
  onChange={(e) =>
    setForm({ ...form, time: e.target.value })
  }
>
  <option value="">
    Выберите время
  </option>

  <option>10:00</option>
  <option>11:00</option>
  <option>12:00</option>
  <option>13:00</option>
  <option>14:00</option>
  <option>15:00</option>
  <option>16:00</option>
  <option>17:00</option>
  <option>18:00</option>
</select>
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Комментарий"
            value={form.comment}
            onChange={(e) =>
              setForm({ ...form, comment: e.target.value })
            }
          />

          <button style={styles.button}>
            Записаться
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    background:
      "linear-gradient(135deg, #8edbd5, #f6a6c1, #f3c1d8)",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: "30px",
    padding: "35px",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.5)",
    color: "#333",
    fontSize: "13px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "42px",
    color: "#222",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#444",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  input: {
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    background: "rgba(255,255,255,0.95)",
    color: "#222",
    fontWeight: "500",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    background: "rgba(255,255,255,0.95)",
    color: "#222",
    fontWeight: "500",
    fontSize: "15px",
    minHeight: "90px",
    outline: "none",
    resize: "none",
  },

  button: {
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background:
      "linear-gradient(135deg, #22b8b0, #e75492)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};