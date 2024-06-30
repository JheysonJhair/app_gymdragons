import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { User } from "../../types/User";
import { obtenerUsuarios } from "../../services/Usuario";

import "bootstrap/dist/css/bootstrap.min.css";

export function Users() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [UsuariosPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const indexOfLastUsuario = currentPage * UsuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - UsuariosPerPage;
  const currentUsuarios = usuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredUsuarios = currentUsuarios.filter((usuario) =>
    Object.values(usuario).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditUser = (usuario: User) => {
    setSelectedUser(usuario);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const saveChanges = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del usuario
    // Puedes hacer una solicitud HTTP para actualizar el usuario en el servidor
    // Y luego actualizar el estado de usuarios y cerrar el modal
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: number) => {
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
          `https://zonafitbk.ccontrolz.com/api/user/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario");
        }

        const updatedUsuarios = usuarios.filter(
          (usuario) => usuario.IdUser !== id
        );
        setUsuarios(updatedUsuarios);

        await Swal.fire(
          "¡Eliminado!",
          "El usuario ha sido eliminado.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      Swal.fire("Error", "Hubo un error al eliminar el usuario", "error");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Usuario</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Lista de usuarios
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuario..."
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
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Nombres y apellidos</th>
                <th>Dni</th>
                <th>Teléfono</th>
                <th>Fecha de nacimiento</th>
                <th>ACESO</th>
                <th>ROL</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.UserName}</td>
                  <td>{usuario.Password}</td>
                  <td>
                    {usuario.FirstName} {usuario.LastName}
                  </td>
                  <td>{usuario.Dni}</td>
                  <td>{usuario.PhoneNumber}</td>
                  <td>{usuario.BirthDate}</td>
                  <td>
                    {usuario.Access ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ACTIVO
                      </span>
                    ) : (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        INACTIVO
                      </span>
                    )}
                  </td>
                  <td>
                    {usuario.RoleId === 1
                      ? "ADMINISTRADOR"
                      : usuario.RoleId === 2
                      ? "VENDEDOR"
                      : "SIN ROL"}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginRight: "6px" }}
                      title="Editar"
                      onClick={() => handleEditUser(usuario)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(usuario.IdUser || 0)}
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
          {usuarios.map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para editar usuario */}
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={selectedUser.UserName}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  Nombre(s)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={selectedUser.FirstName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      FirstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Apellido(s)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={selectedUser.LastName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      LastName: e.target.value,
                    })
                  }
                />
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
