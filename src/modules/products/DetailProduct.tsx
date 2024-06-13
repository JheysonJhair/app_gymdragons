export function DetailProduct() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/*breadcrumb*/}
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">eCommerce</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Products Details
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">
            <div className="btn-group">
              <button type="button" className="btn btn-primary">
                Settings
              </button>
              <button
                type="button"
                className="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
              >
                {" "}
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                {" "}
                <a className="dropdown-item" href="javascript:;">
                  Action
                </a>
                <a className="dropdown-item" href="javascript:;">
                  Another action
                </a>
                <a className="dropdown-item" href="javascript:;">
                  Something else here
                </a>
                <div className="dropdown-divider" />{" "}
                <a className="dropdown-item" href="javascript:;">
                  Separated link
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*end breadcrumb*/}
        <div className="card">
          <div className="row g-0">
            <div className="col-md-4 border-end">
              <img
                src="../../assets/images/products/13.png"
                className="img-fluid"
                alt="..."
              />
              <div className="row mb-3 row-cols-auto g-2 justify-content-center mt-3">
                <div className="col">
                  <img
                    src="../../assets/images/products/12.png"
                    width={70}
                    className="border rounded cursor-pointer"

                  />
                </div>
                <div className="col">
                  <img
                    src="../../assets/images/products/11.png"
                    width={70}
                    className="border rounded cursor-pointer"

                  />
                </div>
                <div className="col">
                  <img
                    src="../../assets/images/products/14.png"
                    width={70}
                    className="border rounded cursor-pointer"

                  />
                </div>
                <div className="col">
                  <img
                    src="../../assets/images/products/15.png"
                    width={70}
                    className="border rounded cursor-pointer"

                  />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title">
                  Off-White Odsy-1000 Men Half T-Shirt
                </h4>
                <div className="d-flex gap-3 py-3">
                  <div className="cursor-pointer">
                    <i className="bx bxs-star text-warning" />
                    <i className="bx bxs-star text-warning" />
                    <i className="bx bxs-star text-warning" />
                    <i className="bx bxs-star text-warning" />
                    <i className="bx bxs-star text-secondary" />
                  </div>
                  <div>142 reviews</div>
                  <div className="text-success">
                    <i className="bx bxs-cart-alt align-middle" /> 134 orders
                  </div>
                </div>
                <div className="mb-3">
                  <span className="price h4">$149.00</span>
                  <span className="text-muted">/per kg</span>
                </div>
                <p className="card-text fs-6">
                  Virgil Abloh’s Off-White is a streetwear-inspired collection
                  that continues to break away from the conventions of
                  mainstream fashion. Made in Italy, these black and brown
                  Odsy-1000 low-top sneakers.
                </p>
                <dl className="row">
                  <dt className="col-sm-3">Model#</dt>
                  <dd className="col-sm-9">Odsy-1000</dd>
                  <dt className="col-sm-3">Color</dt>
                  <dd className="col-sm-9">Brown</dd>
                  <dt className="col-sm-3">Delivery</dt>
                  <dd className="col-sm-9">Russia, USA, and Europe </dd>
                </dl>
                <hr />
                <div className="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                  <div className="col">
                    <label className="form-label">Quantity</label>
                    <div className="input-group input-spinner">
                      <button
                        className="btn btn-white"
                        type="button"
                        id="button-plus"
                      >
                        {" "}
                        +{" "}
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={1}
                      />
                      <button
                        className="btn btn-white"
                        type="button"
                        id="button-minus"
                      >
                        {" "}
                        −{" "}
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Select size</label>
                    <div >
                      <label className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="select_size"
                          defaultChecked
                        />
                        <div className="form-check-label">Small</div>
                      </label>
                      <label className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="select_size"
                          defaultChecked
                        />
                        <div className="form-check-label">Medium</div>
                      </label>
                      <label className="form-check form-check-inline">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="select_size"
                          defaultChecked
                        />
                        <div className="form-check-label">Large</div>
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Select Color</label>
                    <div className="color-indigators d-flex align-items-center gap-2">
                      <div className="color-indigator-item bg-primary" />
                      <div className="color-indigator-item bg-danger" />
                      <div className="color-indigator-item bg-success" />
                      <div className="color-indigator-item bg-warning" />
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <a href="#" className="btn btn-primary">
                    Buy Now
                  </a>
                  <a href="#" className="btn btn-outline-primary">
                    <span className="text">Add to cart</span>{" "}
                    <i className="bx bxs-cart-alt" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <ul className="nav nav-tabs nav-primary mb-0" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#primaryhome"
                  role="tab"
                  aria-selected="true"
                >
                  <div className="d-flex align-items-center">
                    <div className="tab-icon">
                      <i className="bx bx-comment-detail font-18 me-1" />
                    </div>
                    <div className="tab-title"> Product Description </div>
                  </div>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#primaryprofile"
                  role="tab"
                  aria-selected="false"
                >
                  <div className="d-flex align-items-center">
                    <div className="tab-icon">
                      <i className="bx bx-bookmark-alt font-18 me-1" />
                    </div>
                    <div className="tab-title">Tags</div>
                  </div>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#primarycontact"
                  role="tab"
                  aria-selected="false"
                >
                  <div className="d-flex align-items-center">
                    <div className="tab-icon">
                      <i className="bx bx-star font-18 me-1" />
                    </div>
                    <div className="tab-title">Reviews</div>
                  </div>
                </a>
              </li>
            </ul>
            <div className="tab-content pt-3">
              <div
                className="tab-pane fade show active"
                id="primaryhome"
                role="tabpanel"
              >
                <p>
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth. Cosby sweater eu banh mi, qui irure terry richardson ex
                  squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi.
                </p>
                <p>
                  Raw denim you probably haven't heard of them jean shorts
                  Austin. Nesciunt tofu stumptown aliqua, retro synth master
                  cleanse. Mustache cliche tempor, williamsburg carles vegan
                  helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher
                  synth. Cosby sweater eu banh mi, qui irure terry richardson ex
                  squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                  quis cardigan american apparel, butcher voluptate nisi.
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="primaryprofile"
                role="tabpanel"
              >
                <p>
                  Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                  single-origin coffee squid. Exercitation +1 labore velit, blog
                  sartorial PBR leggings next level wes anderson artisan four
                  loko farm-to-table craft beer twee. Qui photo booth
                  letterpress, commodo enim craft beer mlkshk aliquip jean
                  shorts ullamco ad vinyl cillum PBR. Homo nostrud organic,
                  assumenda labore aesthetic magna delectus mollit. Keytar
                  helvetica VHS salvia yr, vero magna velit sapiente labore
                  stumptown. Vegan fanny pack odio cillum wes anderson 8-bit,
                  sustainable jean shorts beard ut DIY ethical culpa terry
                  richardson biodiesel. Art party scenester stumptown, tumblr
                  butcher vero sint qui sapiente accusamus tattooed echo park.
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="primarycontact"
                role="tabpanel"
              >
                <p>
                  Etsy mixtape wayfarers, ethical wes anderson tofu before they
                  sold out mcsweeney's organic lomo retro fanny pack lo-fi
                  farm-to-table readymade. Messenger bag gentrify pitchfork
                  tattooed craft beer, iphone skateboard locavore carles etsy
                  salvia banksy hoodie helvetica. DIY synth PBR banksy irony.
                  Leggings gentrify squid 8-bit cred pitchfork. Williamsburg
                  banh mi whatever gluten-free, carles pitchfork biodiesel fixie
                  etsy retro mlkshk vice blog. Scenester cred you probably
                  haven't heard of them, vinyl craft beer blog stumptown.
                  Pitchfork sustainable tofu synth chambray yr.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h6 className="text-uppercase mb-0">Related Product</h6>
        <hr />
        <div className="row row-cols-1 row-cols-lg-3">
          <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="../../assets/images/products/16.png"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">Light Grey Headphone</h6>
                    <div className="cursor-pointer my-2">
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-secondary" />
                    </div>
                    <div className="clearfix">
                      <p className="mb-0 float-start fw-bold">
                        <span className="me-2 text-decoration-line-through text-secondary">
                          $240
                        </span>
                        <span>$199</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="../../assets/images/products/17.png"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">Black Cover iPhone 8</h6>
                    <div className="cursor-pointer my-2">
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                    </div>
                    <div className="clearfix">
                      <p className="mb-0 float-start fw-bold">
                        <span className="me-2 text-decoration-line-through text-secondary">
                          $179
                        </span>
                        <span>$110</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="../../assets/images/products/19.png"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">Men Hand Watch</h6>
                    <div className="cursor-pointer my-2">
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-warning" />
                      <i className="bx bxs-star text-secondary" />
                      <i className="bx bxs-star text-secondary" />
                    </div>
                    <div className="clearfix">
                      <p className="mb-0 float-start fw-bold">
                        <span className="me-2 text-decoration-line-through text-secondary">
                          $150
                        </span>
                        <span>$120</span>
                      </p>
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
