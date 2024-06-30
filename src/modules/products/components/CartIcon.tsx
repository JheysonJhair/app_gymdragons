import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../../types/Product";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface CartIconProps {
  cartItems: Product[];
}

const CartIcon: React.FC<CartIconProps> = ({ cartItems }) => {
  const [showModal, setShowModal] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.Price, 0);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="cart-icon">
        <NavLink to="/area/cart/" className="btn btn-primary position-relative">
          <i className="bx bxs-cart" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItems.length}
          </span>
        </NavLink>
        <div className="cart-dropdown">
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.IdProduct} className="list-group-item">
                {item.Name} - ${item.Price}
              </li>
            ))}
          </ul>
          <div className="cart-total mt-3">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="btn btn-success mt-2 w-100" onClick={handleShowModal}>
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
                {item.Name} - ${item.Price}
              </li>
            ))}
          </ul>
          <div className="cart-total mt-3">
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={() => console.log("Venta realizada")}>
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartIcon;
