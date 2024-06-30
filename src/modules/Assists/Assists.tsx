export function Assists() {
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
            placeholder="Buscar cliente por NOMBRE - TELÉFONO - CÓDIGO"
          />
          <button className="btn btn-outline-secondary" type="button">
            <i className="bx bx-search" />
          </button>
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
      </div>
    </div>
  );
}
