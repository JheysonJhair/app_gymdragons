import { useState } from "react";
import { obtenerClientePorCODE } from "../../services/Cliente";
import { fetchAssistancesByCode } from "../../services/Asistencia";
import Swal from "sweetalert2";

export function Assists() {
  const [cliente, setCliente] = useState<any | null>(null);
  const [asistencias, setAsistencias] = useState<any[]>([]);

  //---------------------------------------------------------------- GET BY CODE CLIENT
  const buscarClientePorCode = async (code: string) => {
    if (code.length === 4) {
      try {
        const clienteObtenido = await obtenerClientePorCODE(code);
        const cliente = await fetchAssistancesByCode(code);   
        if (cliente.success && clienteObtenido.success) {
          Swal.fire({
            title: "Correcto!",
            text: clienteObtenido.msg,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: clienteObtenido.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
        console.log(cliente)
        setAsistencias(cliente.data);
        setCliente(clienteObtenido.data !== null ? clienteObtenido.data : null);
      } catch (error) {
        setCliente(null);
        setAsistencias([]);
        Swal.fire({
          title: "Error!",
          text: "Oppss, algo salio mal!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
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
                  Todas las Asistencias
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente por código XXXX"
            onChange={(e) => buscarClientePorCode(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="bx bx-search" />
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-8">
                    <div className="row mb-3">
                      <label
                        htmlFor="input01"
                        className="col-sm-3 col-form-label"
                      >
                        Nombres
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-user" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="input01"
                            placeholder="Nombre"
                            value={cliente?.FirstName || ""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="input02"
                        className="col-sm-3 col-form-label"
                      >
                        Apellidos
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-user" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="input02"
                            placeholder="Apellidos"
                            value={cliente?.LastName || ""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="input03"
                        className="col-sm-3 col-form-label"
                      >
                        DNI
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-id-card" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="input03"
                            placeholder="Dni"
                            value={cliente?.Document || ""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="input04"
                        className="col-sm-3 col-form-label"
                      >
                        Direccion
                      </label>
                      <div className="col-sm-9">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-map" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="input04"
                            placeholder="Dirección"
                            value={cliente?.Address || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="../../assets/images/avatars/avatar-1.png"
                        alt="Admin"
                        className=" p-1 bg-danger"
                        width={180}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="input05" className="col-sm-4 col-form-label">
                    Estado civil
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-heart" />
                      </span>
                      <select
                        className="form-select"
                        id="input05"
                        value={cliente?.MaritalStatus || ""}
                      >
                        <option>Seleccionar estado civil</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="Viudo">Viudo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input06" className="col-sm-4 col-form-label">
                    Seleccionar genero
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user-circle" />
                      </span>
                      <select
                        className="form-select"
                        id="input06"
                        value={cliente?.Gender || ""}
                      >
                        <option value="">Seleccionar genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="input07" className="col-sm-4 col-form-label">
                    Correo Electrónico
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-envelope" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input07"
                        placeholder="Email"
                        value={cliente?.Mail || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input08" className="col-sm-4 col-form-label">
                    Telefono
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-phone" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input08"
                        placeholder="Número"
                        value={cliente?.PhoneNumber || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 ">
            <div className="card radius-10">
              <table className="table mb-0 ">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Asistencia</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Día</th>
                    <th scope="col">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencias.length === 0 ? (
                    <tr>
                      <td  className="">
                        DD/MM/YY
                      </td>
                      <td  className="">
                        00:00:00
                      </td>
                      <td  className="">
                        No hay
                      </td>
                      <td  className="">
                        No se encontro
                      </td>
                    </tr>
                  ) : (
                    asistencias.map((asistencia) => (
                      <tr key={asistencia.IdAttendance}>
                        <td>
                          {new Date(asistencia.AttendanceDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(asistencia.AttendanceDate).toLocaleTimeString()}
                        </td>
                        <td>
                          {new Date(asistencia.AttendanceDate).toLocaleDateString("es-ES", { weekday: 'long' })}
                        </td>
                        <td>{asistencia.UserName}</td>
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
  );
}
