import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../../types/Product";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { realizarVenta } from "../../../services/Producto";
import Swal from "sweetalert2";

interface CartIconProps {
  cartItems: Product[];
  onVentaExitosa: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ cartItems, onVentaExitosa }) => {
  const [showModal, setShowModal] = useState(false);
  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => total + item.Price, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setVentaExitosa(false);
  };

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

    try {
      const response = await realizarVenta(totalPrice, cartItems);
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
