import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Client } from "../../types/Client";
import { obtenerClientes } from "../../services/Cliente";

export function Clients() {
  const [clientes, setClientes] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = clientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredClientes = currentClientes.filter((cliente) =>
    Object.values(cliente).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  //---------------------------------------------------------------- GET CLIENT
  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerClientes();
      setClientes(data);
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- DELETE CLIENT
  const handleDeleteClient = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await fetch(
          `https://zonafitbk.ccontrolz.com/api/client/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el cliente");
        }

        const updatedClientes = clientes.filter(
          (cliente) => cliente.IdClient !== id
        );
        setClientes(updatedClientes);

        await Swal.fire(
          "¡Eliminado!",
          "Tu cliente ha sido eliminado.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      Swal.fire("Error", "Hubo un error al eliminar el cliente", "error");
    }
  };

  //---------------------------------------------------------------- EDIT CLIENT
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClient(null);
  };

  const saveChanges = async () => {
    try {
      Swal.fire("¡Actualizado!", "El cliente ha sido actualizado.", "success");
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      Swal.fire("Error", "Hubo un error al actualizar el cliente", "error");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Cliente</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Lista de clientes
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Estado Civil</th>
                <th>Whatssap</th>
                <th>Género</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.FirstName}</td>
                  <td>{cliente.LastName}</td>
                  <td>{cliente.Document}</td>
                  <td>{cliente.PhoneNumber}</td>
                  <td>{cliente.Mail}</td>
                  <td>{cliente.MaritalStatus}</td>
                  <td>{cliente.Whatsapp}</td>
                  <td>{cliente.Gender}</td>
                  <td>{cliente.Address}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginRight: "6px" }}
                      title="Editar"
                      onClick={() => handleEditClient(cliente)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClient(cliente.IdClient || 0)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="pagination justify-content-center">
          {clientes.map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para editar cliente */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Nombre(s)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={selectedClient.FirstName}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          FirstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="document" className="form-label">
                      DNI
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="document"
                      value={selectedClient.Document}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          Document: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="mail"
                      value={selectedClient.Mail}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          Mail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="whatsapp" className="form-label">
                      Whatsapp
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="whatsapp"
                      value={selectedClient.Whatsapp}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          Whatsapp: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={selectedClient.Address}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          Address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Apellido(s)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={selectedClient.LastName}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          LastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={selectedClient.PhoneNumber}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          PhoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="maritalStatus" className="form-label">
                      Estado Civil
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maritalStatus"
                      value={selectedClient.MaritalStatus}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          MaritalStatus: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Género
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      value={selectedClient.Gender}
                      onChange={(e) =>
                        setSelectedClient({
                          ...selectedClient,
                          Gender: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
