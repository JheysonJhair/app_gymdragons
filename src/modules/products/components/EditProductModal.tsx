import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

import { EditProductModalProps } from "../../../types/Product";
import { updateProduct } from "../../../services/Producto";

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  onHide,
  product,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    Name: product?.Name || "",
    Description: product?.Description || "",
    Image: product?.Image || "",
    Price: product?.Price || 0,
    PurchasePrice: product?.PurchasePrice || 0,
    Type: product?.Type || 0,
    Stock: product?.Stock || 0,
  });

  const [errorMessages, setErrorMessages] = useState({
    Type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "Type" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (product) {
      try {
        const response = await updateProduct(product.IdProduct, formData);
        if (!response.success) {
          throw new Error(response.msg);
        }
        onUpdate(response.data);
        onHide();
        Swal.fire("Actualizado", response.msg, "success");
      } catch (error) {
        Swal.fire("Error", "Oppss, algo salió mal!", "error");
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productPurchasePrice">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              name="PurchasePrice"
              value={formData.PurchasePrice}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="productType">
            <Form.Label>Tipo</Form.Label>
            <select
              className={`form-select ${errorMessages.Type ? "is-invalid" : ""}`}
              name="Type"
              value={formData.Type}
              onChange={(e) => {
                handleChange(e);
                setErrorMessages({ ...errorMessages, Type: "" });
              }}
              required
            >
              <option value={0}>Seleccionar tipo</option>
              <option value={1}>Gaseosa</option>
              <option value={2}>Energizante</option>
              <option value={3}>Alcoholicas</option>
            </select>
          </Form.Group>
          <Form.Group controlId="productStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="Stock"
              value={formData.Stock}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
