import { NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export function ClientMembership() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [days, setDays] = useState('');
  const [date, setDate] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveChanges = () => {
    if (days && date) {
      console.log("Días:", days);
      console.log("Fecha:", date);
      setModalIsOpen(false);
    } else {
      alert("Por favor complete todos los campos.");
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
                  Plan de membresía
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente por NOMBRE - TELÉFONO - CÓDIGO"
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="bx bx-search" />
          </button>
        </div>
        <div className="col-12 col-lg-12 d-flex">
          <div className="card radius-10 w-100">
            <div className="card-body">
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <h6 className="mb-0 text-center">PLAN UNIVERSITARIO</h6>
                  </div>
                </div>
              </div>
              <div className="alert alert-dark border-0 bg-dark alert-dismissible fade show py-2">
                <div className="d-flex align-items-center">
                  <div className="font-35 text-white">
                    <i className="bx bx-bell" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 text-white">Membresia</h6>
                    <div className="text-white">
                      Faltan 10 días para finalizar!
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                />
              </div>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">Detalles de plan de membresía</h5>
                <Button variant="primary" onClick={() => setModalIsOpen(true)}>
                  Congelar días
                </Button>
              </div>


              <div className="card radius-10">
                <table className="table mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Promoción</th>
                      <th scope="col">Inscripción</th>
                      <th scope="col">Fecha inicio</th>
                      <th scope="col">Fecha fin</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Freezing</th>
                      <th scope="col">Responsable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 mes</td>
                      <td>12/12/12</td>
                      <td>12/12/12</td>
                      <td>$30</td>
                      <td>Rec-0000012</td>
                      <td>2</td>
                      <td>Jhairxd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h5 className="card-title">Vouchers</h5>
              <hr />
              <div className="card">
                <div className="card-body">
                  <table className="table mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Comprobante</th>
                        <th scope="col">Fpago</th>
                        <th scope="col">Creador</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Activo</td>
                        <td>12/12/12</td>
                        <td>$30</td>
                        <td>Rec-0000012</td>
                        <td>Efectivo</td>
                        <td>Jhairxd</td>
                      </tr>
                      <tr>
                        <td>Activo</td>
                        <td>12/12/12</td>
                        <td>$30</td>
                        <td>Rec-0000012</td>
                        <td>Efectivo</td>
                        <td>Jhairxd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congelar días</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="days" className="form-label">Cantidad de días</label>
            <input
              type="number"
              className="form-control"
              id="days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
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
