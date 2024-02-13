import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../src/components/Header";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get("http://localhost:3000/api/tickets");
      setTickets(response.data);
      setLoading(false);
    };

    fetchTickets();
  }, []);

  const handleTicketStatusChange = async (_id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/tickets/${_id}`, { status });
      const updatedTickets = tickets.map((ticket) =>
        ticket._id === _id ? { ...ticket, status } : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error al enviar solicitud PUT:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <Header />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>
              <button type="button" className="btn btn-success">
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.client}</td>
              <td>{ticket.description}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleTicketStatusChange(ticket._id, e.target.value)
                  }
                >
                  <option value="in progress">En Progreso</option>
                  <option value="coordinated">Coordinado</option>
                  <option value="delayed">Retrasado</option>
                  <option value="revisit">Revisita</option>
                  <option value="completed">Completado</option>
                  <option value="closed for liquidation">
                    Cerrado para Liquidación
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
