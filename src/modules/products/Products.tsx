import { useState, useEffect } from "react";
import { Product } from "../../types/Product";
import { fetchProducts } from "../../services/Producto";
import { NavLink } from "react-router-dom";
import CartIcon from "./components/CartIcon";
import './Products.css'; // Importa el archivo CSS

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Product[]>([]);

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

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <div className="cart-icon-container">
        <CartIcon cartItems={cart} />
      </div>
      <div className="page-content">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-lg-5 col-xl-2 text-lg-end mb-3 mb-lg-0">
                    <NavLink
                      to="/area/new-product/"
                      className="btn btn-danger d-block w-100"
                    >
                      <i className="bx bxs-plus-square me-2" /> Nuevo Producto
                    </NavLink>
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
                <NavLink to={`/area/detail-product/${product.IdProduct}`}>
                  <img
                    src={product.Image}
                    className="card-img-top"
                    alt={product.Name}
                  />
                </NavLink>
                <div className="card-body">
                  <h6 className="card-title cursor-pointer">{product.Name}</h6>
                  <div className="clearfix">
                    <p className="mb-0 float-start">
                      <strong>Stock:</strong> {product.Stock}
                    </p>
                    <p className="mb-0 float-end fw-bold">${product.Price}</p>
                  </div>
                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="bx bxs-cart-add" /> Agregar al carrito
                  </button>
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
