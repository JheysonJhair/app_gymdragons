import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export function HomePage() {
  const dataBarra = {
    series: [
      {
        data: [70, 91, 125, 30, 40, 35, 50, 49, 60],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
        ],
      },
    } as ApexOptions,
  };

  const dataMultiLinea = {
    series: [
      {
        name: "Ventas",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Clientes",
        data: [10, 80, 25, 52, 29, 60, 74, 98, 205],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
        ],
      },
      legend: {
        position: "top",
      },
    } as ApexOptions,
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
          <div className="col">
            <div className="card radius-10 border-start border-0   border-4 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total de ventas</p>
                    <h4 className="my-1 text-info">321</h4>
                    <p className="mb-0 font-13">+1.4% Respecto al mes pasado</p>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
                    <i className="bx bxs-cart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0   border-4 border-danger">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Ingresos totales</p>
                    <h4 className="my-1 text-danger">S/.1200</h4>
                    <p className="mb-0 font-13">+4.4% Respecto al mes pasado</p>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-burning text-white ms-auto">
                    <i className="bx bxs-wallet" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-success">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Productos totales</p>
                    <h4 className="my-1 text-success">46</h4>
                    <p className="mb-0 font-13">+2.4% Respecto al mes pasado</p>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                    <i className="bx bxs-bar-chart-alt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-warning">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total de clientes</p>
                    <h4 className="my-1 text-warning">538</h4>
                    <p className="mb-0 font-13">+3% Respecto al mes pasado</p>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-orange text-white ms-auto">
                    <i className="bx bxs-group" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-7 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Ventas</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={dataMultiLinea.options}
                  series={dataMultiLinea.series}
                  type="line"
                  height={350}
                />{" "}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Clientes </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={dataBarra.options}
                  series={dataBarra.series}
                  type="bar"
                  height={350}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
