import { useState, useEffect } from "react";
import { Product } from "../../types/Product";
import { fetchProducts } from "../../services/Producto";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-lg-5 col-xl-2 text-lg-end mb-3 mb-lg-0">
                    <a
                      href="ecommerce-add-new-products.html"
                      className="btn btn-danger d-block w-100"
                    >
                      <i className="bx bxs-plus-square me-2" />
                      Nuevo Producto
                    </a>
                  </div>
                  <div className="col-lg-7 col-xl-10 text-lg-start">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        <i className="bx bx-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
          {filteredProducts.map((product) => (
            <div key={product.IdProduct} className="col">
              <div className="card">
                <img
                  src={product.Image}
                  className="card-img-top"
                  alt={product.Name}
                />
                <div className="card-body">
                  <h6 className="card-title cursor-pointer">{product.Name}</h6>
                  <div className="clearfix">
                    <p className="mb-0 float-start">
                      <strong>Stock:</strong> {product.Stock}
                    </p>
                    <p className="mb-0 float-end fw-bold">${product.Price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
