import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { getPagoCompletoCode } from "../../services/Pago";
import { crearCongelarDias } from "../../services/Congelar";

export function ClientMembership() {
  const [detallePago, setDetallePago] = useState<any[]>([]);

  //---------------------------------------------------------------- GET BY CODE CLIENT
  const buscarClientePorCode = async (code: string) => {
    if (code.length === 4) {
      try {
        const cliente = await getPagoCompletoCode(code);
        if (cliente.success && cliente.success) {
          Swal.fire({
            title: "Correcto!",
            text: cliente.msg,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: cliente.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }

        setDetallePago(cliente.data);
      } catch (error) {
        setDetallePago([]);
        Swal.fire({
          title: "Error!",
          text: "Oppss, algo salio mal!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [days, setDays] = useState("");
  const [date, setDate] = useState("");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveChanges = async () => {
    if (days && date) {
      try {
        const idPayment = detallePago[0]?.idPayment;
        const response = await crearCongelarDias({
          idPayment: idPayment,
          NumberOfDay: parseInt(days),
          Frozen: true,
          FrozenDate: date,
        });

        if (response.success) {
          Swal.fire({
            title: "Éxito!",
            text: response.msg,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
        setModalIsOpen(false);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Oppss, algo salio mal!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      Swal.fire({
        title: "Campos vacíos!",
        text: "Complete los dos campos!",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
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
            placeholder="Busque por codigo"
            onChange={(e) => buscarClientePorCode(e.target.value)}
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
                    <h6 className="mb-2 mt-2 text-center">
                      PLAN UNIVERSITARIO
                    </h6>
                  </div>
                </div>
              </div>
              <div className="mt-3 alert alert-dark border-0 bg-dark alert-dismissible fade show py-2">
                <div className="d-flex align-items-center">
                  <div className="font-35 text-white">
                    <i className="bx bx-bell" />
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 text-white">Membresia</h6>
                    <div className="text-white">
                      Faltan menos de 10 días para finalizar!
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
              <div className="mb-4 mt-2 d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">
                  Detalles de plan de membresía
                </h5>
                {detallePago.length !== 0 && (
                  <Button
                    variant="primary"
                    onClick={() => setModalIsOpen(true)}
                  >
                    Congelar días
                  </Button>
                )}
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
                    {detallePago.length === 0 ? (
                      <tr>
                        <td className="">No tiene</td>
                        <td className="">DD/MM/YY</td>
                        <td className="">DD/MM/YY</td>
                        <td className="">DD/MM/YY</td>
                        <td className="">0.0</td>
                        <td className="">0</td>
                        <td className="">No tiene</td>
                      </tr>
                    ) : (
                      detallePago.map((detallePago) => (
                        <tr key={detallePago.IdAttendance}>
                          <td>{detallePago.Promocion}</td>
                          <td>{detallePago.Insccripcion}</td>
                          <td>{detallePago.fechainicio}</td>
                          <td>{detallePago.fechafin}</td>
                          <td>{detallePago.precio}</td>
                          <td>{detallePago.congelamiento}</td>
                          <td>{detallePago.responsable}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <h5 className="card-title">Vouchers</h5>
              <hr />

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
                  {detallePago.length === 0 ? (
                    <tr>
                      <td className="">No tiene</td>
                      <td className="">DD/MM/YY</td>
                      <td className="">0.0</td>
                      <td className="">Rec-xxxxxx</td>
                      <td className="">No establecido</td>
                      <td className="">No tiene</td>
                    </tr>
                  ) : (
                    detallePago.map((detallePago) => (
                      <tr key={detallePago.IdAttendance}>
                        <td>{detallePago.estado}</td>
                        <td>{detallePago.fecha}</td>
                        <td>{detallePago.monto}</td>
                        <td>{detallePago.comprobante}</td>
                        <td>{detallePago.formapago}</td>
                        <td>{detallePago.creador}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
            <label htmlFor="days" className="form-label">
              Cantidad de días
            </label>
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
            <label htmlFor="date" className="form-label">
              Fecha
            </label>
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
