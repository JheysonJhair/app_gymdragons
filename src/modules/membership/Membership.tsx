import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Membership } from "../../types/Membership";
import {
  getMembresias,
  addMembresia,
  updateMembresia,
  deleteMembresia,
} from "../../services/Membresias";
import {
  validateRequiredField,
  validatePositiveNumber,
} from "../../utils/validations";

export function Memberships() {
  const [membresias, setMembresias] = useState<Membership[]>([]);
  const [newMembresia, setNewMembresia] = useState<Membership>({
    Name: "",
    Price: "",
    Time: "",
    Enabled: true,
  });
  const [errors, setErrors] = useState<{ [key in keyof Membership]?: string }>(
    {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [membresiasPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMembresia, setEditMembresia] = useState<Membership | null>(null);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastMembresia = currentPage * membresiasPerPage;
  const indexOfFirstMembresia = indexOfLastMembresia - membresiasPerPage;
  const currentMembresias = membresias.slice(
    indexOfFirstMembresia,
    indexOfLastMembresia
  );

  const filteredMembresias = currentMembresias.filter((membresia) =>
    Object.values(membresia).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  //---------------------------------------------------------------- GET MEMBERSHIPS
  useEffect(() => {
    const fetchMembresias = async () => {
      const data = await getMembresias();
      setMembresias(data);
    };
    fetchMembresias();
  }, []);

  //---------------------------------------------------------------- CHANGE INPUT
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === "Enabled") {
      setNewMembresia({
        ...newMembresia,
        [id]: value === "true" ? true : false,
      });
    } else {
      setNewMembresia({
        ...newMembresia,
        [id]: id === "Price" || id === "Time" ? Number(value) : value,
      });
    }

    const error = validateField(id as keyof Membership, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id as keyof Membership]: error || undefined,
    }));
  };

  //---------------------------------------------------------------- POST INPUT
  const handleFormSubmit = async () => {
    const formErrors: { [key in keyof Membership]?: string } = {};
    let isValid = true;

    Object.entries(newMembresia).forEach(([key, value]) => {
      const error = validateField(
        key as keyof Membership,
        value as string | number
      );
      formErrors[key as keyof Membership] = error;
      if (error) isValid = false;
    });

    setErrors(formErrors);

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete los campos correctamente.",
      });
      return;
    }
    try {
      const response = await addMembresia(newMembresia);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        const data = await getMembresias();
        setMembresias(data);
        setNewMembresia({
          Name: "",
          Price: "",
          Time: "",
          Enabled: true,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  //------------------------------------- VALIDATION
  const validateField = (
    name: keyof Membership,
    value: string | number
  ): string | undefined => {
    switch (name) {
      case "Name":
        return validateRequiredField(value as string);
      case "Price":
        return validatePositiveNumber(value as number);
      case "Time":
        return validatePositiveNumber(value as number);
      default:
        return undefined;
    }
  };

  //---------------------------------------------------------------- DELETE INPUT
  const handleDeleteMembership = async (id: any) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarla",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await deleteMembresia(id);
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: response.msg,
          });
          const data = await getMembresias();
          setMembresias(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.msg,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  //---------------------------------------------------------------- OPEN MODAL FOR EDITING
  const openEditModal = (membresia: Membership) => {
    setEditMembresia(membresia);
    setIsModalOpen(true);
  };

  //---------------------------------------------------------------- HANDLE EDIT INPUT CHANGE
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editMembresia) return;
    const { id, value } = e.target;

    if (id === "Enabled") {
      setEditMembresia({
        ...editMembresia,
        [id]: value === "true" ? true : false,
      });
    } else {
      setEditMembresia({
        ...editMembresia,
        [id]: id === "Price" || id === "Time" ? Number(value) : value,
      });
    }

    const error = validateField(id as keyof Membership, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id as keyof Membership]: error || undefined,
    }));
  };

  //---------------------------------------------------------------- HANDLE EDIT FORM SUBMIT
  const handleEditFormSubmit = async () => {
    if (!editMembresia) return;

    const formErrors: { [key in keyof Membership]?: string } = {};
    let isValid = true;

    Object.entries(editMembresia).forEach(([key, value]) => {
      const error = validateField(
        key as keyof Membership,
        value as string | number
      );
      formErrors[key as keyof Membership] = error;
      if (error) isValid = false;
    });

    setErrors(formErrors);

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, complete los campos correctamente.",
      });
      return;
    }
    try {
      const response = await updateMembresia(editMembresia);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        const data = await getMembresias();
        setMembresias(data);
        setIsModalOpen(false);
        setEditMembresia(null);
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Membresía</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Crear y listar membresías
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex">
            <div className="card p-4 rounded">
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="Name" className="form-label">
                    Nombre de membresía
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Name && "is-invalid"}`}
                    id="Name"
                    placeholder="Ingrese el nombre de la membresía"
                    value={newMembresia.Name}
                    onChange={handleInputChange}
                  />
                  {errors.Name && (
                    <div className="invalid-feedback">{errors.Name}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="Price" className="form-label">
                    Precio
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Price && "is-invalid"}`}
                    id="Price"
                    placeholder="00.00"
                    value={newMembresia.Price}
                    onChange={handleInputChange}
                  />
                  {errors.Price && (
                    <div className="invalid-feedback">{errors.Price}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="Time" className="form-label">
                    Tiempo en meses
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Time && "is-invalid"}`}
                    id="Time"
                    placeholder="0"
                    value={newMembresia.Time}
                    onChange={handleInputChange}
                  />
                  {errors.Time && (
                    <div className="invalid-feedback">{errors.Time}</div>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="Enabled" className="form-label">
                    Habilitado
                  </label>
                  <select
                    className={`form-select ${errors.Enabled && "is-invalid"}`}
                    name="Enabled"
                    value={newMembresia.Enabled ? "true" : "false"}
                    onChange={(e) => handleInputChange(e)}
                    id="Enabled"
                  >
                    <option value="true">Habilitar</option>
                    <option value="false">Deshabilitar</option>
                  </select>
                  {errors.Enabled && (
                    <div className="invalid-feedback">{errors.Enabled}</div>
                  )}
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleFormSubmit}
                    >
                      Guardar Membresía
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar membresía..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "20px" }}
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
                    <th>Membresía</th>
                    <th>Precio</th>
                    <th>Tiempo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembresias.map((membresia, index) => (
                    <tr key={index}>
                      <td>{membresia.Name}</td>
                      <td>{membresia.Price}</td>
                      <td>{membresia.Time} meses</td>
                      <td>
                        {membresia.Enabled ? (
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            HABILITADO
                          </span>
                        ) : (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            DESABILITADO
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => openEditModal(membresia)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDeleteMembership(membresia.IdMembership)
                          }
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
              {membresias.map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Membresía</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMembresia && (
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="Name" className="form-label">
                  Nombre de membresía
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  id="Name"
                  value={editMembresia.Name}
                  onChange={handleEditInputChange}
                />
                {errors.Name && (
                  <div className="invalid-feedback">{errors.Name}</div>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="Price" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.Price ? "is-invalid" : ""}`}
                  id="Price"
                  value={editMembresia.Price}
                  onChange={handleEditInputChange}
                />
                {errors.Price && (
                  <div className="invalid-feedback">{errors.Price}</div>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="Time" className="form-label">
                  Tiempo (meses)
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.Time ? "is-invalid" : ""}`}
                  id="Time"
                  value={editMembresia.Time}
                  onChange={handleEditInputChange}
                />
                {errors.Time && (
                  <div className="invalid-feedback">{errors.Time}</div>
                )}
              </div>
              <div className="col-md-12">
                <label htmlFor="Enabled" className="form-label">
                  Habilitado
                </label>
                <select
                  className="form-control"
                  id="Enabled"
                  value={editMembresia.Enabled ? "true" : "false"}
                  onChange={handleEditInputChange}
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditFormSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
