import { useEffect, useState } from "react";

export function ReportsTable() {
  const [ingresoTotalMembresias, setIngresoTotalMembresias] = useState(0);
  const [ingresoTotalProductos, setIngresoTotalProductos] = useState(0);

  useEffect(() => {
    const membresiasElement = document.querySelector("#membresias-total");
    const productosElement = document.querySelector("#productos-total");

    const membresiasTotal = membresiasElement
      ? parseFloat(membresiasElement.textContent || "0")
      : 0;
    const productosTotal = productosElement
      ? parseFloat(productosElement.textContent || "0")
      : 0;

    setIngresoTotalMembresias(membresiasTotal);
    setIngresoTotalProductos(productosTotal);
  }, []);

  const ingresoNeto = ingresoTotalMembresias + ingresoTotalProductos;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Reportes</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Tablas
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h6 className="mb-0 text-uppercase">CAJA DE MEMBRESIAS Y PRODUCTOS</h6>
        <hr />
        <div className="row mb-3">
          <div className="col-md-5">
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-5">
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger">Obtener Datos</button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <h6 className="mb-0 text-uppercase mb-3">MEMBRESIAS </h6>
              <table
                id="example2"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Total deudas</th>
                    <th>Efectivo</th>
                    <th>Targeta de credito</th>
                    <th>Deposito</th>
                    <th>Yape</th>
                    <th>INGRESO TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>NO TIENE</td>
                    <td>300</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td id="membresias-total">300</td>
                  </tr>
                </tbody>
              </table>
              <h6 className="mb-0 text-uppercase mb-3">PRODUCTOS </h6>
              <table
                id="example2"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Total deudas</th>
                    <th>Efectivo</th>
                    <th>Targeta de credito</th>
                    <th>Deposito</th>
                    <th>Yape</th>
                    <th>INGRESO TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>100</td>
                    <td>300</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td id="productos-total">100</td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end mt-3">
                <strong>INGRESO NETO: s./{ingresoNeto.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 className="mb-0 text-uppercase">Membresias y pagos</h6>
          <hr />
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="example2"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>Responsable</th>
                      <th>Plan</th>
                      <th>Cliente</th>
                      <th>Celular</th>
                      <th>Código</th>
                      <th>Precio total</th>
                      <th>Debe</th>
                      <th>Fecha de inicio</th>
                      <th>Fecha fin</th>
                      <th>Forma de pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jhair</td>
                      <td>PLAN UNIVERSITARIO 50</td>
                      <td>Jheyson Jhair Arone Angeles</td>
                      <td>978652736</td>
                      <td>2001</td>
                      <td>s/.100</td>
                      <td>0</td>
                      <td>11/11/24</td>
                      <td>12/12/24</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>PLAN UNIVERSITARIO 50</td>
                      <td>Jheyson Jhair Arone Angeles</td>
                      <td>978652736</td>
                      <td>2001</td>
                      <td>s/.100</td>
                      <td>0</td>
                      <td>11/11/24</td>
                      <td>12/12/24</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>PLAN UNIVERSITARIO 50</td>
                      <td>Jheyson Jhair Arone Angeles</td>
                      <td>978652736</td>
                      <td>2001</td>
                      <td>s/.100</td>
                      <td>0</td>
                      <td>11/11/24</td>
                      <td>12/12/24</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>PLAN UNIVERSITARIO 50</td>
                      <td>Jheyson Jhair Arone Angeles</td>
                      <td>978652736</td>
                      <td>2001</td>
                      <td>s/.100</td>
                      <td>0</td>
                      <td>11/11/24</td>
                      <td>12/12/24</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>PLAN UNIVERSITARIO 50</td>
                      <td>Jheyson Jhair Arone Angeles</td>
                      <td>978652736</td>
                      <td>2001</td>
                      <td>s/.100</td>
                      <td>0</td>
                      <td>11/11/24</td>
                      <td>12/12/24</td>
                      <td>Yape</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h6 className="mb-0 text-uppercase">Venta de productos</h6>
          <hr />
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table
                  id="example2"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>Responsable</th>
                      <th>Fecha de venta</th>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Forma de pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jhair</td>
                      <td>12/12/12</td>
                      <td>Agua</td>
                      <td>s./3</td>
                      <td>Es una bebida natural</td>
                      <td>2</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>12/12/12</td>
                      <td>Agua</td>
                      <td>s./3</td>
                      <td>Es una bebida natural</td>
                      <td>2</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>12/12/12</td>
                      <td>Agua</td>
                      <td>s./3</td>
                      <td>Es una bebida natural</td>
                      <td>2</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>12/12/12</td>
                      <td>Agua</td>
                      <td>s./3</td>
                      <td>Es una bebida natural</td>
                      <td>2</td>
                      <td>Yape</td>
                    </tr>
                    <tr>
                      <td>Jhair</td>
                      <td>12/12/12</td>
                      <td>Agua</td>
                      <td>s./3</td>
                      <td>Es una bebida natural</td>
                      <td>2</td>
                      <td>Yape</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
