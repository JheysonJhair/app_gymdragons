import { useEffect, useState } from "react";
import {
  fetchIncomeMembershipByDateRange,
  fetchIncomeProductByDateRange,
  fetchPaymentByDateRange,
  fetchProductByDateRange,
} from "../../services/Reports";
import { formatDate } from "../../utils/common";

interface Payment {
  UserName: string;
  Plan: string;
  Name: string;
  Celular: string | null;
  Code: string;
  Total: number;
  Due: number;
  StartDate: string;
  EndDate: string;
  PaymentType: string;
}
interface Product {
  Responsable: string;
  Fechaventa: string;
  Producto: string;
  Precio: any;
  Descripcion: string;
  Cantidad: number;
  Formapago: string;
}

export function ReportsTable() {
  const [ingresoTotalMembresias, setIngresoTotalMembresias] = useState(0);
  const [ingresoTotalProductos, setIngresoTotalProductos] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [membresiasData, setMembresiasData] = useState({
    "Total deudas": 0,
    Efectivo: 0,
    "Tarjeta de Credito": 0,
    Yape: 0,
    "Ingreso Total": 0,
  });

  const [productData, setProductData] = useState({
    "Total deudas": "Sin deuda",
    Efectivo: 0,
    "Tarjeta de Credito": 0,
    Yape: 0,
    "Ingreso Total": 0,
  });

  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [productPaymentData, setProductPaymentData] = useState<Product[]>([]);

  const handleFetchData = async () => {
    try {
      const data = await fetchIncomeMembershipByDateRange(
        fechaInicio,
        fechaFin
      );
      if (data.success) {
        setMembresiasData(data.data[0]);
        setIngresoTotalMembresias(data.data[0]["Ingreso Total"]);
      }

      const data2 = await fetchIncomeProductByDateRange(fechaInicio, fechaFin);
      if (data2.success) {
        setProductData(data2.data[0]);
        setIngresoTotalProductos(data2.data[0]["Ingreso Total"]);
      }

      const paymentDataResponse = await fetchPaymentByDateRange(
        fechaInicio,
        fechaFin
      );
      if (paymentDataResponse.success) {
        setPaymentData(paymentDataResponse.data);
      }

      const productDataResponse = await fetchProductByDateRange(
        fechaInicio,
        fechaFin
      );
      console.log(productDataResponse)
      if (productDataResponse.success) {
        setProductPaymentData(productDataResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTodayReport = async () => {
    const today = new Date().toISOString().split("T")[0];

    try {
      const data = await fetchIncomeMembershipByDateRange(today, today);
      if (data.success) {
        setMembresiasData(data.data[0]);
        setIngresoTotalMembresias(data.data[0]["Ingreso Total"]);
      }

      const data2 = await fetchIncomeProductByDateRange(today, today);
      if (data2.success) {
        setProductData(data2.data[0]);
        setIngresoTotalProductos(data2.data[0]["Ingreso Total"]);
      }

      const paymentDataResponse = await fetchPaymentByDateRange(today, today);
      if (paymentDataResponse.success) {
        setPaymentData(paymentDataResponse.data);
      }

      const productDataResponse = await fetchProductByDateRange(today, today);
      if (productDataResponse.success) {
        setProductPaymentData(productDataResponse.data);
      }

      setFechaInicio(today);
      setFechaFin(today);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleTodayReport();
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
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={handleFetchData}>
              Obtener Datos
            </button>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-outline-danger"
              onClick={handleTodayReport}
            >
              Reporte de hoy
            </button>
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
                    <th>Tarjeta de Credito</th>
                    <th>Yape</th>
                    <th>INGRESO TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{membresiasData["Total deudas"]}</td>
                    <td>{membresiasData["Efectivo"]}</td>
                    <td>{membresiasData["Tarjeta de Credito"]}</td>
                    <td>{membresiasData["Yape"]}</td>
                    <td id="membresias-total">
                      {membresiasData["Ingreso Total"]}
                    </td>
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
                    <th>Tarjeta de Credito</th>
                    <th>Yape</th>
                    <th>INGRESO TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{productData["Total deudas"]}</td>
                    <td>{productData["Efectivo"]}</td>
                    <td>{productData["Tarjeta de Credito"]}</td>
                    <td>{productData["Yape"]}</td>
                    <td id="membresias-total">
                      {productData["Ingreso Total"]}
                    </td>
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
                    {paymentData.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.UserName}</td>
                        <td>{payment.Plan}</td>
                        <td>{payment.Name}</td>
                        <td>{payment.Celular || "N/A"}</td>
                        <td>{payment.Code}</td>
                        <td>{payment.Total}</td>
                        <td>{payment.Due}</td>
                        <td>{formatDate(payment.StartDate)}</td>
                        <td>{formatDate(payment.EndDate)}</td>
                        <td>{payment.PaymentType}</td>
                      </tr>
                    ))}
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
                      <th>Precio total</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Forma de pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPaymentData.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.Responsable}</td>
                        <td>{payment.Fechaventa}</td>
                        <td>{payment.Producto}</td>
                        <td>{payment.Precio}</td>
                        <td>{payment.Descripcion}</td>
                        <td>{payment.Cantidad}</td>
                        <td>{payment.Formapago}</td>
                      </tr>
                    ))}
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
