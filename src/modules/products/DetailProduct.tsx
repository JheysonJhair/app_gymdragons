import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/Product";
import { fetchProductById } from "../../services/Producto";
import EditProductModal from "./components/EditProductModal";

export function DetailProduct() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleUpdate = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/*breadcrumb*/}
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
                  Detalles del producto
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/*end breadcrumb*/}
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
                <h4 className="card-title">PRODUCTO: {product.Name}</h4>
                <div className="mb-3">
                  <span className="price h4">s/.{product.Price}</span>
                </div>
                <p className="card-text fs-6">{product.Description}</p>
                <dl className="row">
                  <dt className="col-sm-3">Tipo</dt>
                  <dd className="col-sm-9">{product.Type}</dd>
                  <dt className="col-sm-3">Stock</dt>
                  <dd className="col-sm-9">{product.Stock}</dd>
                </dl>
                <hr />

                <div className="d-flex gap-3 mt-3">
                  <a href="#" className="btn btn-primary" onClick={handleEditClick}>
                    Editar
                  </a>
                  <a href="#" className="btn btn-outline-primary">
                    <span className="text">Agregar al carrito</span>{" "}
                    <i className="bx bxs-cart-alt" />
                  </a>
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
