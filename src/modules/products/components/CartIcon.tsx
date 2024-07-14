import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/AuthContext";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { CartIconProps } from "../../../types/Product";
import { realizarVenta } from "../../../services/Producto";

const CartIcon: React.FC<CartIconProps> = ({ cartItems, onVentaExitosa }) => {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [tipoPago, setTipoPago] = useState<string>("Yape");

  //---------------------------------------------------------------- PAYMENT
  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => total + item.Price, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleCloseModal = () => {
    setShowModal(false);
    setVentaExitosa(false);
  };

  //---------------------------------------------------------------- POST PAYMENT
  const handleRealizarVenta = async () => {
    if (totalPrice <= 0) {
      Swal.fire({
        title: "Error!",
        text: "No hay productos en el carrito.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    if (tipoPago == "") {
      Swal.fire({
        title: "Error!",
        text: "Ingrese el tipo de pago",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await realizarVenta(
        totalPrice,
        tipoPago,
        user?.IdUser || 0,
        cartItems
      );
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setVentaExitosa(true);
        setShowModal(false);
        onVentaExitosa();
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
        text: "Oppss, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <div className="cart-icon">
        <NavLink to="/area/cart/" className="btn btn-danger position-relative">
          <i className="bx bxs-cart" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
            {cartItems.length}
          </span>
        </NavLink>
        <div className="cart-dropdown">
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.IdProduct} className="list-group-item">
                {item.Name} - s./{item.Price}
              </li>
            ))}
          </ul>
          <div className="cart-total mt-3">
            <strong>Total: s./{totalPrice.toFixed(2)}</strong>
          </div>
          <button
            className="btn btn-danger mt-2 w-100"
            onClick={handleShowModal}
          >
            Realizar Venta
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.IdProduct} className="list-group-item">
                {item.Name} - s./{item.Price}
              </li>
            ))}
          </ul>
          <div className="cart-total mt-3">
            <strong>Total: s/{totalPrice.toFixed(2)}</strong>
          </div>
          <div className="mt-3">
            <label htmlFor="paymentType" className="form-label">
              Tipo de pago
            </label>
            <select
              className="form-select"
              id="paymentType"
              value={tipoPago}
              onChange={(e) => setTipoPago(e.target.value)}
            >
              <option value="Yape">Yape</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
          {ventaExitosa && (
            <div className="alert alert-success mt-3" role="alert">
              Venta realizada exitosamente.
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleRealizarVenta}>
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartIcon;
