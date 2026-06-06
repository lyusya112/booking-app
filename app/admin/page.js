"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      router.push("/admin/login");
    } else {
      loadBookings();
    }
  }, []);

  async function loadBookings() {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  }

  async function updateStatus(id, status) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    loadBookings();
  }

  function statusText(status) {
    if (status === "confirmed") return "Подтверждена";
    if (status === "cancelled") return "Отменена";
    return "Новая";
  }

  function statusStyle(status) {
    if (status === "confirmed") return styles.confirmed;
    if (status === "cancelled") return styles.cancelled;
    return styles.newStatus;
  }

  return (
    <main style={styles.page}>
      <section style={styles.wrapper}>
        <div style={styles.header}>
          <div>
            <div style={styles.badge}>ADMIN PANEL</div>
            <h1 style={styles.title}>Заявки клиентов</h1>
            <p style={styles.subtitle}>
              Управляй онлайн-записями и статусами
            </p>
          </div>

          <button
            style={styles.logout}
            onClick={() => {
              localStorage.removeItem("admin");
              router.push("/admin/login");
            }}
          >
            Выйти
          </button>
        </div>

        {bookings.length === 0 ? (
          <div style={styles.empty}>
            Пока нет заявок
          </div>
        ) : (
          <div style={styles.grid}>
            {bookings.map((booking) => (
              <div key={booking.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <h2 style={styles.name}>{booking.name}</h2>
                  <span style={{ ...styles.status, ...statusStyle(booking.status) }}>
                    {statusText(booking.status)}
                  </span>
                </div>

                <div style={styles.info}>
                  <p><b>Телефон:</b> {booking.phone}</p>
                  <p><b>Услуга:</b> {booking.service}</p>
                  <p><b>Дата:</b> {booking.date}</p>
                  <p><b>Время:</b> {booking.time}</p>
                  <p><b>Комментарий:</b> {booking.comment || "Нет"}</p>
                </div>

                <div style={styles.actions}>
                  <button
                    style={styles.confirmButton}
                    onClick={() => updateStatus(booking.id, "confirmed")}
                  >
                    Подтвердить
                  </button>

                  <button
                    style={styles.cancelButton}
                    onClick={() => updateStatus(booking.id, "cancelled")}
                  >
                    Отменить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px 18px",
    background:
      "linear-gradient(135deg, #8edbd5, #f6a6c1, #f3c1d8)",
    fontFamily: "Arial",
  },

  wrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    background: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: "28px",
    padding: "26px",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.55)",
    color: "#333",
    fontSize: "13px",
    fontWeight: "bold",
    marginBottom: "12px",
  },

  title: {
    margin: 0,
    color: "#222",
    fontSize: "38px",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "#444",
  },

  logout: {
    padding: "12px 18px",
    borderRadius: "16px",
    border: "none",
    background: "rgba(255,255,255,0.85)",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer",
  },

  empty: {
    padding: "30px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.5)",
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: "26px",
    padding: "22px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "15px",
  },

  name: {
    margin: 0,
    color: "#222",
    fontSize: "24px",
  },

  status: {
    padding: "7px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  newStatus: {
    background: "#fff3cd",
    color: "#7a5400",
  },

  confirmed: {
    background: "#d1fae5",
    color: "#065f46",
  },

  cancelled: {
    background: "#fee2e2",
    color: "#991b1b",
  },

  info: {
    color: "#333",
    lineHeight: "1.6",
    fontSize: "15px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },

  confirmButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #22b8b0, #4ade80)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  cancelButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #fb7185, #e75492)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};