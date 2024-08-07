import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/AuthContext";

import { Membership } from "../../types/Membership";
import { obtenerClientePorCODE } from "../../services/Cliente";
import { getMembresias } from "../../services/Membresias";
import { realizarPago } from "../../services/Pago";

export function MembershipPayment() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [membresias, setMembresias] = useState<Membership[]>([]);

  const [cliente, setCliente] = useState<any | null>(null);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  const [precio, setPrecio] = useState<number>(0);
  const [aCuenta, setACuenta] = useState(0);
  const [vuelto, setVuelto] = useState(0);
  const [debe, setDebe] = useState(0);
  const [total, setTotal] = useState(0);
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [fechaPago, setFechaPago] = useState<string>("");
  const [formaPago, setFormaPago] = useState("");
  const [Observation, setObservation] = useState("");
  const [reciboPago, setReciboPago] = useState("");
  const [selectedMembershipId, setSelectedMembershipId] = useState<
    number | null
  >(null);

  //---------------------------------------------------------------- CALCULATE MONY
  useEffect(() => {
    const calculatedTotal = subTotal;
    setTotal(calculatedTotal);

    const calculatedDebe = calculatedTotal - aCuenta;
    setDebe(calculatedDebe < 0 ? 0 : calculatedDebe);

    const calculatedVuelto =
      aCuenta > calculatedTotal ? aCuenta - calculatedTotal : 0;
    setVuelto(calculatedVuelto);
  }, [subTotal, descuento, aCuenta]);

  //---------------------------------------------------------------- GET MEMBRESHIP
  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const data = await getMembresias();
        const membresiasHabilitadas = data.filter((m) => m.Enabled === true);
        setMembresias(membresiasHabilitadas);
      } catch (error) {
        console.error("Error al obtener las membresías:", error);
      }
    };

    fetchMembresias();
  }, []);

  //---------------------------------------------------------------- GET BY CODE CLIENT
  const buscarClientePorCode = async (dni: string) => {
    if (dni.length > 0) {
      const clienteObtenido = await obtenerClientePorCODE(dni);
      if (clienteObtenido.data !== null) {
        setCliente(clienteObtenido.data);
      }
    }
  };

  //---------------------------------------------------------------- POST PAYMENT
  const handlePayment = async () => {
    if (!cliente?.FirstName || !cliente?.LastName) {
      Swal.fire({
        icon: "error",
        title: "Campos vacios!",
        text: "Busque un cliente por código.",
      });
      return;
    }

    if (!fechaFin || !fechaInicio || !selectedMembershipId) {
      Swal.fire({
        icon: "error",
        title: "Campos vacios!",
        text: "Seleccione el plan de membresía.",
      });
      return;
    }

    if (!aCuenta || !fechaPago || !formaPago || !reciboPago) {
      Swal.fire({
        icon: "error",
        title: "Campos vacios!",
        text: "Complete el formulario de pago.",
      });
      return;
    }

    try {
      const data = {
        idClient: cliente?.IdClient || 0,
        idMembership: selectedMembershipId || 0,
        IdUser: user?.IdUser || 0,
        StartDate: fechaInicio,
        EndDate: fechaFin,
        Total: total,
        Discount: descuento,
        PriceDiscount: subTotal,
        QuantityDays: calculateDaysBetweenDates(fechaInicio,fechaFin),
        DatePayment: fechaPago,
        Due: debe,
        PrePaid: aCuenta,
        PaymentType: formaPago,
        PaymentReceipt: reciboPago,
        Observation: Observation,
      };
      console.log(data)
      const response = await realizarPago(data);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/area/client-membership/");
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

  const calculateDaysBetweenDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Membresia y pagos</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 d-flex">
            <div className="card radius-10 w-100">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">
                      PASO 1 : Busque o agregue un cliente nuevo
                    </h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-8">
                    <NavLink
                      to="/area/new-client/"
                      className="btn btn-danger btn-block"
                    >
                      <i className="bx bx-user-plus"></i> Nuevo cliente
                    </NavLink>
                  </div>
                  <div className="col-sm-4">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CODIGO"
                        onChange={(e) => buscarClientePorCode(e.target.value)}
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
                </div>

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
                            value={cliente ? cliente.FirstName : ""}
                            readOnly
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
                            readOnly
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
                            readOnly
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
                        width={125}
                      />
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
                        disabled
                      >
                        <option value="">Seleccionar genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
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
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <div>
                    <h6 className="mb-0">PASO 2 : Tipo de membresia</h6>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col">
                    <NavLink
                      to="/area/membership/"
                      className="btn btn-danger btn-block"
                    >
                      <i className="bx bx-purchase-tag"></i> Nueva membresía
                    </NavLink>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="">Fecha inicio</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bx bx-calendar-plus"></i>
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Fecha de Inicio"
                          onChange={(e) => setFechaInicio(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="">Fecha fin</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bx bx-calendar-check"></i>
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Fecha de Fin"
                          onChange={(e) => setFechaFin(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-2 col-form-label">
                    Paquete
                  </label>
                  <div className="col-sm-10">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-package"></i>
                      </span>
                      <select
                        className="form-select"
                        id="input53"
                        onChange={(e) => {
                          const selectedMembresia = membresias.find(
                            (m) => m.IdMembership === parseInt(e.target.value)
                          );
                          if (selectedMembresia) {
                            const precio = Number(selectedMembresia.Price);
                            const descuento = precio * 0;
                            const subTotal = precio - descuento;
                            setSubTotal(subTotal);
                            setDescuento(descuento);
                            setPrecio(precio);

                            if (selectedMembresia.IdMembership !== undefined) {
                              setSelectedMembershipId(
                                selectedMembresia.IdMembership
                              );
                            } else {
                              setSelectedMembershipId(null);
                            }
                          } else {
                            setSubTotal(0);
                            setDescuento(0);
                            setPrecio(0);
                            setSelectedMembershipId(null);
                          }
                        }}
                      >
                        <option value="">Seleccionar paquete aquí</option>
                        {membresias.map((membresia) => (
                          <option
                            key={membresia.IdMembership}
                            value={membresia.IdMembership}
                          >
                            {membresia.Name} PRECIO: {membresia.Price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-5 col-form-label">
                    Sub Total
                  </label>
                  <div className="col-sm-7">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={subTotal.toFixed(2)}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-5 col-form-label">
                    Descuento (0%)
                  </label>
                  <div className="col-sm-7">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-down-arrow-alt" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={descuento.toFixed(2)}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-5 col-form-label">
                    Precio
                  </label>
                  <div className="col-sm-7">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={precio.toFixed(2)}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card radius-10">
          <div className="card-header">
            <div className="d-flex align-items-center">
              <div>
                <h6 className="mb-0">PASO 3: Ingrese pago.</h6>
              </div>
            </div>
          </div>
          <div className="row card-body">
            <div className="col-12 col-lg-6">
              <fieldset>
                <div className="input-group mb-3 ">
                  <label className="mb-3 " htmlFor="">
                    INGRESE LA FECHA Y MONTO DE PAGO
                  </label>
                  <div className="input-group ">
                    <span className="input-group-text">
                      <i className="bx bx-calendar-plus"></i>
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Fecha de Inicio"
                      onChange={(e) => setFechaPago(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-2 col-form-label">
                    A cuenta
                  </label>
                  <div className="col-sm-5">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={aCuenta}
                        onChange={(e) => setACuenta(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-2 col-form-label">
                    Vuelto
                  </label>
                  <div className="col-sm-5">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={vuelto.toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-2 col-form-label">
                    Debe
                  </label>
                  <div className="col-sm-5">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-down-arrow-alt" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={debe.toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-2 col-form-label">
                    Total
                  </label>
                  <div className="col-sm-5">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="0.00"
                        value={total.toFixed(2)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="col-12 col-lg-6">
              <fieldset>
                <div className="input-group ">
                  <label className="mb-3 " htmlFor="">
                    INGRESE LA FORMA Y COMPROBANTE DE PAGO
                  </label>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input53" className="col-sm-4 col-form-label">
                    Forma de pago
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-package"></i>
                      </span>
                      <select
                        className="form-select"
                        id="input53"
                        onChange={(e) => setFormaPago(e.target.value)}
                        value={formaPago}
                      >
                        <option value={undefined}>
                          Seleccionar forma de pago
                        </option>
                        <option value={"Tarjeta de crédito"}>
                          Tarjeta de crédito
                        </option>
                        <option value={"Yape"}>Yape</option>
                        <option value={"Efectivo"}>Efectivo</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input50" className="col-sm-4 col-form-label">
                    Recibo de pago
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-dollar" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="input50"
                        placeholder="Número de recibo"
                        onChange={(e) => setReciboPago(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-text">Observaciones*</span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    defaultValue={""}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                </div>
                <div className="row mt-4">
                  <div className="col"></div>
                  <div className="col-auto ml-auto">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={handlePayment}
                    >
                      <i className="bx bx-dollar"></i> Realizar pago
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
