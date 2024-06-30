import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Product } from "../../../types/Product";
import { updateProduct } from "../../../services/Producto";

interface EditProductModalProps {
  show: boolean;
  onHide: () => void;
  product: Product | null;
  onUpdate: (updatedProduct: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  onHide,
  product,
  onUpdate
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (product) {
      try {
        const updatedProduct = await updateProduct(product.IdProduct, formData);
        onUpdate(updatedProduct);
        onHide();
      } catch (error) {
        console.error("Failed to update product:", error);
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
          <Form.Group controlId="productImage">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              name="Image"
              value={formData.Image}
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
            <Form.Control
              type="number"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
            />
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
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
