import { useState } from "react";

const products = [
  {
    IdProduct: 1,
    Name: "Energizante",
    Price: 2.5,
    Stock: 20,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 2,
    Name: "Café",
    Price: 3.0,
    Stock: 15,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 3,
    Name: "Galletas",
    Price: 1.75,
    Stock: 30,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 4,
    Name: "Agua",
    Price: 1.0,
    Stock: 50,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 5,
    Name: "Chocolate",
    Price: 2.25,
    Stock: 25,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 6,
    Name: "Galletas",
    Price: 1.75,
    Stock: 30,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 7,
    Name: "Agua",
    Price: 1.0,
    Stock: 50,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
  {
    IdProduct: 8,
    Name: "Chocolate",
    Price: 2.25,
    Stock: 25,
    ImgProduct:
      "https://static.vecteezy.com/system/resources/previews/010/979/402/original/water-bottle-3d-illustration-png.png",
  },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: any) => {
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
                      className="btn btn-primary d-block w-100"
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
                  src={product.ImgProduct}
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
