import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { getPagoCompletoCode } from "../../services/Pago";
import { crearCongelarDias } from "../../services/Congelar";

export function ClientMembership() {
  const [detallePago, setDetallePago] = useState<any[]>([]);
  const [client, setClient] = useState<any>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [days, setDays] = useState("");
  const [date, setDate] = useState("");

  const [showMembershipAlert, setShowMembershipAlert] = useState(false);
  //---------------------------------------------------------------- GET BY CODE CLIENT
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

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveChanges = async () => {
    if (days && date) {
      try {
        const lastIndex = detallePago.length - 1;
        const idPayment = detallePago[lastIndex]?.PaymentId;
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
  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
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
            placeholder="Buscar cliente por código o nombres o apellidos o telefono..."
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
        <div className="col-12 col-lg-12 d-flex">
          <div className="card radius-10 w-100">
            <div className="card-body">
              <div className="card-header">
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    {client && client.FirstName ? (
                      <>
                        <h6 className="mb-2 mt-2 text-center">
                          {client.Payment[0].Membership.Name}
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
              <div className="row">
                <div className="col-12 col-lg-4 d-flex">
                  <div className="col-lg-12">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="../../assets/images/avatars/avatar-1.png"
                          alt="Admin"
                          className="rounded-circle p-1 bg-danger"
                          width={110}
                        />
                        <div className="mt-3">
                          {client && client.FirstName ? (
                            <>
                              <h4>
                                {" "}
                                {client.FirstName ||
                                  "Nombre no disponible"}{" "}
                                {client.LastName || "Nombre no disponible"}
                              </h4>
                            </>
                          ) : (
                            <h4>Nombre del cliente</h4>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8">
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

                  <div className="d-flex flex-column align-items-start mb-3">
                    <h5 className="mt-4 card-title">Vouchers</h5>
                    <hr className="w-100" />
                  </div>

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
              <div className="d-flex flex-column align-items-start mb-3">
                <hr className="w-100" />
              </div>
              <div className="mb-4 mt-2 d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">
                  Detalles de plan de membresía
                </h5>
                {detallePago.length !== 0 && (
                  <Button variant="danger" onClick={() => setModalIsOpen(true)}>
                    Congelar días
                  </Button>
                )}
              </div>

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
                    <tr key={detallePago[detallePago.length - 1].PaymentId}>
                      <td>{detallePago[0].Membership.Name}</td>
                      <td>
                        {formatDate(
                          detallePago[detallePago.length - 1].DatePayment
                        )}
                      </td>
                      <td>
                        {formatDate(
                          detallePago[detallePago.length - 1].StartDate
                        )}
                      </td>
                      <td>
                        {formatDate(
                          detallePago[detallePago.length - 1].EndDate
                        )}
                      </td>
                      <td>{detallePago[detallePago.length - 1].PrePaid}</td>
                      <td>
                        {detallePago[0].FreezingDay !== null
                          ? detallePago[0].FreezingDay
                          : 0}
                      </td>
                      <td>{detallePago[0].User.UserName}</td>
                    </tr>
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
          <Button variant="danger" onClick={saveChanges}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
