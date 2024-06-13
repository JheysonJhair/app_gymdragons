import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
const membresias = [
  {
    IdMembreship: 1,
    Name: "PLAN UNIVERSITARIO",
    Price: 2.5,
    Time: 20,
    Enabled: true,
  },
  {
    IdMembreship: 2,
    Name: "PUBLICO GENERAL",
    Price: 3.0,
    Time: 15,
    Enabled: true,
  },
  {
    IdMembreship: 3,
    Name: "INTERDIARIO O MEDIO MES",
    Price: 1.75,
    Time: 30,
    Enabled: true,
  },
];

export function Membership() {
  const [currentPage, setCurrentPage] = useState(1);
  const [membresiasPerPage] = useState(9);

  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastmembresia = currentPage * membresiasPerPage;
  const indexOfFirstmembresia = indexOfLastmembresia - membresiasPerPage;
  const currentmembresias = membresias.slice(
    indexOfFirstmembresia,
    indexOfLastmembresia
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredmembresias = currentmembresias.filter((membresia) =>
    Object.values(membresia).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteMembreship = async (id: number) => {
    console.log(id);
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
                  Crear y listar membresias
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
                  <label htmlFor="inputProductTitle" className="form-label">
                    Nombre de membresía
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputProductTitle"
                    placeholder="Ingrese el nombre de la membresía"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPrice" className="form-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPrice"
                    placeholder="00.00"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputCompareatprice" className="form-label">
                    Tiempo en meses
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputCompareatprice"
                    placeholder="0"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputProductType" className="form-label">
                    Habilitado
                  </label>
                  <select className="form-select" id="inputProductType">
                    <option>Seleccionar estado</option>
                    <option value={"true"}>Habilitar</option>
                    <option value={"false"}>Desabilitar</option>
                  </select>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button type="button" className="btn btn-danger">
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
                  {filteredmembresias.map((membresia, index) => (
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
                          className="btn btn-primary btn-sm"
                          style={{ marginRight: "6px" }}
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDeleteMembreship(membresia.IdMembreship || 0)
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
    </div>
  );
}
