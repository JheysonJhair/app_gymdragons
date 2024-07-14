import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import {
  fetchClientCountsByDate,
  fetchPaymentCounts,
  getClientDue,
} from "../services/Reports";
import { calculateDaysBetweenDates, formatDate } from "../utils/common";

export function HomePage() {
  const [datosPayment, setDatosPayment] = useState<any>();
  const [clientDueData, setClientDueData] = useState<any[]>([]);
  const [clientCountsByMonth, setClientCountsByMonth] = useState<any[]>([]);

  //---------------------------------------------------------------- GET DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentCountResponse = await fetchPaymentCounts();

        setDatosPayment(paymentCountResponse);
        const clientDueResponse = await getClientDue();

        if(clientDueResponse.success){
          setClientDueData(clientDueResponse.data);
        }

        const clientCountsResponse = await fetchClientCountsByDate();
        if(clientCountsResponse){
          setClientCountsByMonth(clientCountsResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //---------------------------------------------------------------- GRAFIC
  const dataMultiLinea = {
    series: [
      {
        name: "Clientes",
        data: clientCountsByMonth.map((item) => parseInt(item.count)),
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: clientCountsByMonth.map((item) => {
          const [year, month] = item.month.split("-");
          const date = new Date(parseInt(year), parseInt(month) - 1, 1);
          return date.toLocaleString("default", { month: "long" });
        }),
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
            <div className="card radius-10 border-start border-0 border-4 border-info">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Total de ventas</p>
                    <h4 className="my-1 text-info">
                      {datosPayment ? datosPayment.paymentCount : "0"}
                    </h4>
                  </div>
                  <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
                    <i className="bx bxs-cart" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card radius-10 border-start border-0 border-4 border-danger">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <p className="mb-0 text-secondary">Ingresos (Membresias)</p>
                    <h4 className="my-1 text-danger">
                      S/{datosPayment ? datosPayment.totalRevenue : "0"}
                    </h4>
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
                    <h4 className="my-1 text-success">
                      {datosPayment ? datosPayment.productCount : "0"}
                    </h4>
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
                    <h4 className="my-1 text-warning">
                      {datosPayment ? datosPayment.clientCount : "0"}
                    </h4>
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
          <div className="col-12 col-lg-5 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Clientes</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={dataMultiLinea.options}
                  series={dataMultiLinea.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">Clientes con deuda</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <table className="table mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombres y apellidos</th>
                        <th scope="col">Debe</th>
                        <th scope="col">Fecha inicio</th>
                        <th scope="col">Fecha fin</th>
                        <th scope="col">Días</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDueData.map((client: any) => (
                        <tr key={client.Code}>
                          <td>{client.Code}</td>
                          <td>{client.Apellido}</td>
                          <td>{client.Due}</td>
                          <td>{formatDate(client.StartDate)}</td>
                          <td>{formatDate(client.EndDate)}</td>
                          <td>
                            {calculateDaysBetweenDates(
                              client.StartDate,
                              client.EndDate
                            )}{" "}
                            días
                          </td>
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
    </div>
  );
}
