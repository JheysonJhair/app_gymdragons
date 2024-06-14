import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
export function NewProduct() {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const imagePreview = document.getElementById(
      "image-preview"
    ) as HTMLImageElement;

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        if (typeof e.target?.result === "string") {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        }
      };

      reader.readAsDataURL(file);
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
                        type="email"
                        className="form-control"
                        id="inputProductTitle"
                        placeholder="Ingrese el nombre de producto"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="inputProductDescription"
                        className="form-label"
                      >
                        Descripción
                      </label>
                      <textarea
                        className="form-control"
                        id="inputProductDescription"
                        rows={3}
                        placeholder="Ingrese alguna descripcion"
                        defaultValue={""}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image-uploadify" className="form-label">
                        Imagen del producto
                      </label>
                      <div className="input-group">
                        <input
                          id="image-uploadify"
                          type="file"
                          accept="image/*,"
                          multiple
                          className="form-control"
                          onChange={handleImageUpload}
                        />
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faImage} />
                        </span>
                      </div>
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
                          className="form-control"
                          id="inputPrice"
                          placeholder="00.00"
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          htmlFor="inputCompareatprice"
                          className="form-label"
                        >
                          Precio de compra
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="inputCompareatprice"
                          placeholder="00.00"
                        />
                      </div>
                      <div className="col-12">
                        <label
                          htmlFor="inputProductType"
                          className="form-label"
                        >
                          Tipo de producto
                        </label>
                        <select className="form-select" id="inputProductType">
                          <option>Seleccionar tipo</option>
                          <option value={1}>Gaseosa</option>
                          <option value={2}>Energizante</option>
                          <option value={3}>Alcoholicas</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button type="button" className="btn btn-danger">
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
