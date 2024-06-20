import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { addProduct } from "../../services/Producto";

export function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [type, setType] = useState(0);
  const [errorMessages, setErrorMessages] = useState({
    Name: "",
    Description: "",
    Image: "",
    Price: "",
    PurchasePrice: "",
    Type: ""
  });

  const validateField = (name: string, value: string | number | undefined) => {
    switch (name) {
      case "Name":
        return value ? null : "El nombre del producto es obligatorio.";
      case "Description":
        return value ? null : "La descripción del producto es obligatoria.";
      case "Image":
        return value ? null : "La imagen del producto es obligatoria.";
      case "Price":
        return value ? null : "El precio del producto es obligatorio.";
      case "PurchasePrice":
        return value ? null : "El precio de compra del producto es obligatorio.";
      case "Type":
        return value !== 0 ? null : "El tipo de producto es obligatorio.";
      default:
        return null;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const imagePreview = document.getElementById("image-preview") as HTMLImageElement;

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (typeof e.target?.result === "string") {
          setImage(e.target.result); 
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Validación de todos los campos
    const nameError = validateField("Name", name);
    const descriptionError = validateField("Description", description);
    const imageError = validateField("Image", image);
    const priceError = validateField("Price", price);
    const purchasePriceError = validateField("PurchasePrice", purchasePrice);
    const typeError = validateField("Type", type);

    if (
      nameError ||
      descriptionError ||
      imageError ||
      priceError ||
      purchasePriceError ||
      typeError
    ) {
      setErrorMessages({
        Name: nameError || "",
        Description: descriptionError || "",
        Image: imageError || "",
        Price: priceError || "",
        PurchasePrice: purchasePriceError || "",
        Type: typeError || ""
      });
      return;
    }

    const newProduct = {
      Name: name,
      Description: description,
      Image: image,
      Price: price,
      PurchasePrice: purchasePrice,
      Type: type,
    };

    try {
      await addProduct(newProduct);
      alert("Producto agregado con éxito!");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error al agregar el producto.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Producto</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo producto
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card">
          <div className="card-body p-4">
            <h5 className="card-title">Agregar nuevo producto</h5>
            <hr />
            <div className="form-body mt-4">
              <div className="row">
                <div className="col-lg-6">
                  <div className="border border-3 p-4 rounded">
                    <div className="mb-3">
                      <label htmlFor="inputProductTitle" className="form-label">
                        Nombre de producto
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.Name ? "is-invalid" : ""
                        }`}
                        id="inputProductTitle"
                        placeholder="Ingrese el nombre de producto"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrorMessages({ ...errorMessages, Name: "" });
                        }}
                        required
                      />
                      {errorMessages.Name && (
                        <div className="invalid-feedback">
                          {errorMessages.Name}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputProductDescription"
                        className="form-label"
                      >
                        Descripción
                      </label>
                      <textarea
                        className={`form-control ${
                          errorMessages.Description ? "is-invalid" : ""
                        }`}
                        id="inputProductDescription"
                        rows={3}
                        placeholder="Ingrese alguna descripcion"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setErrorMessages({ ...errorMessages, Description: "" });
                        }}
                        required
                      />
                      {errorMessages.Description && (
                        <div className="invalid-feedback">
                          {errorMessages.Description}
                        </div>
                      )}
                    </div>
  
                    <div className="mb-3">
                      <label htmlFor="image-uploadify" className="form-label">
                        Imagen del producto
                      </label>
                      <div className="input-group">
                        <input
                          id="image-uploadify"
                          type="file"
                          accept="image/*"
                          className={`form-control ${
                            errorMessages.Image ? "is-invalid" : ""
                          }`}
                          onChange={handleImageUpload}
                          required
                        />
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faImage} />
                        </span>
                      </div>
                      {errorMessages.Image && (
                        <div className="invalid-feedback">
                          {errorMessages.Image}
                        </div>
                      )}
                    </div>
  
                    <img
                      id="image-preview"
                      className="img-fluid"
                      alt="Preview"
                      style={{ display: "none", maxWidth: "52%" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="border border-3 p-4 rounded">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="inputPrice" className="form-label">
                          Precio
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            errorMessages.Price ? "is-invalid" : ""
                          }`}
                          id="inputPrice"
                          placeholder="00.00"
                          value={price}
                          onChange={(e) => {
                            setPrice(parseFloat(e.target.value));
                            setErrorMessages({ ...errorMessages, Price: "" });
                          }}
                          required
                        />
                        {errorMessages.Price && (
                          <div className="invalid-feedback">
                            {errorMessages.Price}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="inputCompareatprice"
                          className="form-label"
                        >
                          Precio de compra
                        </label>
                        <input
                          type="number"
                          className={`form-control ${
                            errorMessages.PurchasePrice ? "is-invalid" : ""
                          }`}
                          id="inputCompareatprice"
                          placeholder="00.00"
                          value={purchasePrice}
                          onChange={(e) => {
                            setPurchasePrice(parseFloat(e.target.value));
                            setErrorMessages({
                              ...errorMessages,
                              PurchasePrice: ""
                            });
                          }}
                          required
                        />
                        {errorMessages.PurchasePrice && (
                          <div className="invalid-feedback">
                            {errorMessages.PurchasePrice}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="inputProductType"
                          className="form-label"
                        >
                          Tipo de producto
                        </label>
                        <select
                          className={`form-select ${
                            errorMessages.Type ? "is-invalid" : ""
                          }`}
                          id="inputProductType"
                          value={type}
                          onChange={(e) => {
                            setType(parseInt(e.target.value));
                            setErrorMessages({ ...errorMessages, Type: "" });
                          }}
                          required
                        >
                          <option value={0}>Seleccionar tipo</option>
                          <option value={1}>Gaseosa</option>
                          <option value={2}>Energizante</option>
                          <option value={3}>Alcoholicas</option>
                        </select>
                        {errorMessages.Type && (
                          <div className="invalid-feedback">
                            {errorMessages.Type}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleSubmit}
                          >
                            Guardar Producto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default NewProduct;
