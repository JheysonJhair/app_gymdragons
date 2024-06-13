import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  obtenerClientePorID,
  obtenerClientePorDNI,
} from "../../services/Cliente";
import { Client } from "../../types/Client";

export function MarkAssistance() {
  const [cliente, setCliente] = useState<Client | null>(null);

  const buscarClientePorDNI = async (dni: string) => {
    const clienteObtenido = await obtenerClientePorDNI(dni);
    setCliente(clienteObtenido !== null ? clienteObtenido : null);
  };

  const buscarClientePorID = async (id: number) => {
    const clienteObtenido = await obtenerClientePorID(id);
    setCliente(clienteObtenido !== null ? clienteObtenido : null);
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
          <div className="col-12 col-lg-5 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="DNI"
                        onChange={(e) => buscarClientePorDNI(e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Código"
                        onChange={(e) =>
                          buscarClientePorID(parseInt(e.target.value))
                        }
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        disabled
                      >
                        <i className="bx bx-search"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <NavLink
                      to="/area/newcliente/"
                      className="btn btn-danger btn-block"
                    >
                      <i className="bx bx-check"></i>
                      Marcar asistencia
                    </NavLink>
                  </div>
                </div>

                <div className="row">
                  <div className="row mb-3"></div>
                  <div className="d-flex flex-column align-items-center text-center mb-3">
                    <img
                      src="../../assets/images/avatars/avatar-1.png"
                      alt="Admin"
                      className=" p-1 bg-danger"
                      width={190}
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
                        value={`${cliente?.FirstName || ""} ${
                          cliente?.LastName || ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3 mt-3">
                  <label htmlFor="input51" className="col-sm-4 col-form-label">
                    Dni
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
                        placeholder="Dni"
                        value={cliente?.Document || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 d-flex">
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

                <div>
                  <h6 className="mb-2 text-uppercase">Pagos y cuotas</h6>
                </div>
                <div className="row px-3">
                  <div className="alert alert-dark border-0 bg-secondary alert-dismissible fade show py-0 col-5">
                    <div className="d-flex align-items-center">
                      <div className="font-35 text-white">
                        <i className="bx bx-error-circle"></i>
                      </div>
                      <div className="ms-3">
                        <div className="text-white">DEBE 50 EN SOLES</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center justify-content-end">
                    <NavLink
                      to="/area/newcliente/"
                      className="btn btn-danger btn-block"
                    >
                      <i className="bx bx-dollar"></i>
                      Pagar
                    </NavLink>
                  </div>
                </div>

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
      </div>
    </div>
  );
}
