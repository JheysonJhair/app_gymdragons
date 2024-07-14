import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { Product } from "../../types/Product";
import { deleteProduct, fetchProductById } from "../../services/Producto";
import EditProductModal from "./components/EditProductModal";

export function DetailProduct() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  //---------------------------------------------------------------- GET BY ID PRODUCT
  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (productId) {
          const product = await fetchProductById(productId);
          setProduct(product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    loadProduct();
  }, [productId]);

  //---------------------------------------------------------------- UPDATE PRODUCT
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleUpdate = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };
  //---------------------------------------------------------------- DELETE PRODUCT
  const handleDeleteProduct = async () => {
    try {
      if (!product) return;

      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        if (productId) {
          const response = await deleteProduct(productId);
          console.log(response);
          if (response.success) {
            Swal.fire("¡Producto eliminado!", response.msg, "success");
            navigate("/area/products/");
          } else {
            Swal.fire("Error", response.msg, "error");
          }
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al intentar eliminar el producto.",
        "error"
      );
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Producto</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a>
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detalles del producto
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4 border-end">
              <img
                src={product.Image}
                className="img-fluid"
                alt={product.Name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">
                  Información del producto: {product.Name}
                </h4>
                <div className="mb-3">
                  <span className="price h4">s/.{product.Price}</span>
                </div>
                <p className="card-text fs-6">{product.Description}</p>
                <dl className="row">
                  <dt className="col-sm-3">Tipo</dt>
                  <dd className="col-sm-9">
                    {product.Type === 1
                      ? "Gaseosa"
                      : product.Type === 2
                      ? "Energizante"
                      : "Alcohólicas"}
                  </dd>
                  <dt className="col-sm-3">Precio de compra</dt>
                  <dd className="col-sm-9">{product.PurchasePrice}</dd>
                  <dt className="col-sm-3">Stock</dt>
                  <dd className="col-sm-9">{product.Stock}</dd>
                </dl>
                <hr />

                <div className="d-flex gap-3 mt-3">
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={handleEditClick}
                  >
                    Editar el producto
                  </a>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDeleteProduct}
                  >
                    Eliminar producto
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      {product && (
        <EditProductModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          product={product}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default DetailProduct;
