import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import Swal from "sweetalert2";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { getPagoCompletoCode, repairPago } from "../../services/Pago";
import { crearAsistencia } from "../../services/Asistencia";
import { formatDate } from "../../utils/common";
import { useNavigate } from "react-router-dom";

export function MarkAssistance() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [detallePago, setDetallePago] = useState<any[]>([]);
  const [client, setClient] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMembershipAlert, setShowMembershipAlert] = useState(false);
  const [days, setDays] = useState("");

  const [selectedPaymentType, setSelectedPaymentType] = useState("Yape");

  //---------------------------------------------------------------- SEARCH CLIENT CODE
  const buscarClientePorCode = async () => {
    const inputCodigo = document.getElementById(
      "inputBusqueda"
    ) as HTMLInputElement | null;

    if (!inputCodigo) {
      Swal.fire({
        title: "Error!",
        text: "No se encontró el campo de búsqueda.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const code = inputCodigo.value;

    try {
      const cliente = await getPagoCompletoCode(code);
      if (cliente.data.Payment.length === 0) {
        Swal.fire({
          title: "Error!",
          text: "El cliente no ah realizado el pago!",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
        setClient(null);
        setDetallePago([]);
        return;
      }
      if (cliente.success) {
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

      setClient(cliente.data);
      setDetallePago(cliente.data.Payment);

      if (cliente.data.Payment && cliente.data.Payment.length > 0) {
        const endDate = new Date(cliente.data.Payment[0].EndDate);
        const today = new Date();
        const differenceInDays = Math.floor(
          (endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        if (differenceInDays < 10) {
          setShowMembershipAlert(true);
        } else {
          setShowMembershipAlert(false);
        }
      }
    } catch (error) {
      setDetallePago([]);
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  //---------------------------------------------------------------- POST DUE CLIENT
  const saveChanges = async () => {
    try {
      if (!days.trim()) {
        Swal.fire({
          title: "Error!",
          text: "Por favor ingresa el monto a pagar.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const paymentData = {
        IdClient: client.IdClient,
        IdUser: user?.IdUser,
        Amount: Number(days),
        TypePayment: selectedPaymentType,
      };
      const response = await repairPago(paymentData);

      if (response.success) {
        Swal.fire({
          title: "Éxito!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        navigate("/");
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
        text: "Oppss, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  //---------------------------------------------------------------- POST  ATTENDANCE
  const marcarAsistenciaCliente = async () => {
    try {
      const response = await crearAsistencia(client?.Code, user?.IdUser || 0);
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
          <div className="breadcrumb-title pe-3">Asistencias</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Marcar Asistencia
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-8">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Código/nombres/apellidos/telefono"
                        id="inputBusqueda"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={buscarClientePorCode}
                      >
                        <i className="bx bx-search" />
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    {detallePago.length !== 0 && (
                      <Button
                        variant="danger"
                        onClick={() => marcarAsistenciaCliente()}
                      >
                        Marcar Asistencia
                      </Button>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="row mb-3"></div>
                  <div className="d-flex flex-column align-items-center text-center mb-3">
                    <img
                      src="../../assets/images/avatars/avatar-1.png"
                      alt="Admin"
                      className=" p-1 bg-danger"
                      width={160}
                    />
                  </div>
                </div>
                <div className="row mb-3 mt-3">
                  <label htmlFor="input51" className="col-sm-4 col-form-label">
                    Nombres y apellidos
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input51"
                        placeholder="Nombres y apellidos"
                        value={`${client?.FirstName || ""} ${
                          client?.LastName || ""
                        }`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3 mt-3">
                  <label htmlFor="input51" className="col-sm-4 col-form-label">
                    Teléfono
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-id-card" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input51"
                        placeholder=""
                        value={client?.PhoneNumber || ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-body">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-center">
                    <div>
                      {client && client.FirstName ? (
                        <>
                          <h6 className="mb-2 mt-2 text-center">
                            {client.Payment[detallePago.length - 1].Membership.Name}
                          </h6>
                        </>
                      ) : (
                        <h6 className="mb-2 mt-2 text-center">
                          PLAN DE MEMBRESIA
                        </h6>
                      )}
                    </div>
                  </div>
                </div>
                {detallePago.length !== 0 && (
                  <>
                    {showMembershipAlert && (
                      <div className="mt-3 alert alert-dark border-0 bg-dark alert-dismissible fade show py-2">
                        <div className="d-flex align-items-center">
                          <div className="font-35 text-white">
                            <i className="bx bx-bell" />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-0 text-white">Membresía</h6>
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
                    )}
                  </>
                )}

                <div>
                  <h6 className="mb-2 mt-2 text-uppercase">Pagos y cuotas</h6>
                </div>
                <div className="row px-3">
                  {detallePago.length !== 0 &&
                    detallePago.some((pago) => pago.Due > 0) && (
                      <div className="alert alert-dark border-0 bg-secondary alert-dismissible fade show py-0 col-5">
                        <div className="d-flex align-items-center">
                          <div className="font-35 text-white">
                            <i className="bx bx-error-circle"></i>
                          </div>
                          <div className="ms-3">
                            <div className="text-white">
                              DEBE{" "}
                              {detallePago.reduce(
                                (total, pago) => total + pago.Due,
                                0
                              )}{" "}
                              EN SOLES
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  <div className="col-7 d-flex align-items-center justify-content-end">
                    {detallePago.length !== 0 && (
                      <Button
                        variant="danger"
                        onClick={() => setModalIsOpen(true)}
                      >
                        Pagar deuda
                      </Button>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <table className="table mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Estado</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Debe</th>
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
                          <tr key={detallePago.PaymentId}>
                            <td
                              className={
                                detallePago.Due === 0
                                  ? "text-success"
                                  : detallePago.Due > 0
                                  ? "text-warning"
                                  : ""
                              }
                            >
                              {detallePago.Due === 0
                                ? "Pagado"
                                : detallePago.Due > 0
                                ? "Pendiente"
                                : ""}
                            </td>
                            <td>{formatDate(detallePago.DatePayment)}</td>
                            <td>{detallePago.PrePaid}</td>
                            <td>{detallePago.Due}</td>
                            <td>{detallePago.PaymentReceipt}</td>
                            <td>{detallePago.PaymentType}</td>
                            <td>{detallePago.User.UserName}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card radius-10">
          <table className="table mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Promoción</th>
                <th scope="col">Inscripcion</th>
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
                <tr key={detallePago[detallePago.length - 1].PaymentId}>
                  <td>{detallePago[detallePago.length - 1].Membership.Name}</td>
                  <td>
                    {formatDate(
                      detallePago[detallePago.length - 1].DatePayment
                    )}
                  </td>
                  <td>
                    {formatDate(detallePago[detallePago.length - 1].StartDate)}
                  </td>
                  <td>
                    {formatDate(detallePago[detallePago.length - 1].EndDate)}
                  </td>
                  <td>{detallePago[detallePago.length - 1].Membership.Price}</td>
                  <td>
                    {detallePago[detallePago.length - 1].FreezingDay.length === 0
                      ? "SIN CONGELAR"
                      : detallePago[detallePago.length - 1].FreezingDay[
                          detallePago[detallePago.length - 1].FreezingDay.length - 1
                        ].NumberOfDay}
                  </td>
                  <td>{detallePago[detallePago.length - 1].User.UserName}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          {detallePago.length === 0 ? (
            <Modal.Title>Pagar deuda </Modal.Title>
          ) : (
            <Modal.Title>Pagar deuda s./{detallePago[detallePago.length - 1].Due}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="days" className="form-label">
              Monto a pagar
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
            <label htmlFor="paymentType" className="form-label">
              Tipo de pago
            </label>
            <select
              className="form-select"
              id="paymentType"
              value={selectedPaymentType}
              onChange={(e) => setSelectedPaymentType(e.target.value)}
            >
              <option value="Yape">Yape</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={saveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
