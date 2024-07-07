import React, { useState } from "react";
import Swal from "sweetalert2";
import { crearCliente } from "../../services/Cliente";
import { Client, ErrorMessages } from "../../types/Client";
import { useNavigate } from "react-router-dom";
import {
  validateRequiredField,
  validatePhoneNumber,
} from "../../utils/validations";

export function NewClient() {
  const navigate = useNavigate();
  const [nuevoCliente, setNuevoCliente] = useState<Partial<Client>>({});
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    FirstName: "",
    LastName: "",
    Gender: "",
    PhoneNumber: "",
  });

  const handleRegisterClient = async () => {
    const requiredFields: (keyof ErrorMessages)[] = [
      "FirstName",
      "LastName",
      "Gender",
      "PhoneNumber",
    ];

    const newErrorMessages = { ...errorMessages };

    requiredFields.forEach((field) => {
      const value = nuevoCliente[field];
      newErrorMessages[field] = validateField(field, value);
    });

    setErrorMessages(newErrorMessages);

    const invalidFields = requiredFields.filter(
      (field) => !nuevoCliente[field] || newErrorMessages[field]
    );

    if (invalidFields.length > 0) {
      Swal.fire({
        title: "Error!",
        text: "Por favor complete todos los campos obligatorios.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await crearCliente(nuevoCliente);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/area/clients/");
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al registrar el cliente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNuevoCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name as keyof ErrorMessages, value),
    }));
  };

  const validateField = (
    name: keyof ErrorMessages,
    value: string | undefined
  ): string | null => {
    switch (name) {
      case "PhoneNumber":
        return (
          validatePhoneNumber(value) || validateRequiredField(value) || null
        );
      default:
        return validateRequiredField(value) || null;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Cliente</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo cliente
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card p-4">
          <div className="row">
            <div className="col-sm-6">
              <div className="row mb-3">
                <label htmlFor="input01" className="col-sm-5 col-form-label">
                  Nombres
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.FirstName && "is-invalid"
                      }`}
                      id="input01"
                      placeholder="Nombre"
                      name="FirstName"
                      onChange={handleInputChange}
                    />
                    {errorMessages.FirstName && (
                      <div className="invalid-feedback">
                        {errorMessages.FirstName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input02" className="col-sm-5 col-form-label">
                  Apellidos
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.LastName && "is-invalid"
                      }`}
                      id="input02"
                      placeholder="Apellidos"
                      name="LastName"
                      onChange={handleInputChange}
                    />
                    {errorMessages.LastName && (
                      <div className="invalid-feedback">
                        {errorMessages.LastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="input03" className="col-sm-5 col-form-label">
                  Direccion <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-map" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Address && "is-invalid"
                      }`}
                      id="input03"
                      placeholder="Dirección"
                      name="Address"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Address && (
                      <div className="invalid-feedback">
                        {errorMessages.Address}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input04" className="col-sm-5 col-form-label">
                  Estado civil <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-heart" />
                    </span>
                    <select
                      className={`form-select ${
                        errorMessages.MaritalStatus && "is-invalid"
                      }`}
                      name="MaritalStatus"
                      onChange={handleInputChange}
                      id="input04"
                    >
                      <option>Seleccionar estado civil</option>
                      <option value="Soltero">Soltero</option>
                      <option value="Casado">Casado</option>
                      <option value="Viudo">Viudo</option>
                    </select>
                    {errorMessages.MaritalStatus && (
                      <div className="invalid-feedback">
                        {errorMessages.MaritalStatus}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input05" className="col-sm-5 col-form-label">
                  Género
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user-circle" />
                    </span>
                    <select
                      className={`form-select ${
                        errorMessages.Gender && "is-invalid"
                      }`}
                      name="Gender"
                      onChange={handleInputChange}
                      id="input05"
                    >
                      <option>Seleccionar genero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                    {errorMessages.Gender && (
                      <div className="invalid-feedback">
                        {errorMessages.Gender}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input06" className="col-sm-5 col-form-label">
                  Tipo de documento <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-globe" />
                    </span>
                    <select
                      className={`form-select ${
                        errorMessages.DocumentType && "is-invalid"
                      }`}
                      name="DocumentType"
                      onChange={handleInputChange}
                      id="input06"
                    >
                      <option>Seleccionar tipo</option>
                      <option value="dni">DNI</option>
                      <option value="carnet">Carnet</option>
                    </select>
                    {errorMessages.DocumentType && (
                      <div className="invalid-feedback">
                        {errorMessages.DocumentType}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`row mb-3 ${
                  nuevoCliente.DocumentType === "dni" ? "" : "d-none"
                }`}
                id="dniField"
              >
                <label htmlFor="input07" className="col-sm-5 col-form-label">
                  DNI <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-id-card" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Document && "is-invalid"
                      }`}
                      id="input07"
                      placeholder="Dni"
                      name="Document"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Document && (
                      <div className="invalid-feedback">
                        {errorMessages.Document}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`row mb-3 ${
                  nuevoCliente.DocumentType === "carnet" ? "" : "d-none"
                }`}
                id="carnetField"
              >
                <label htmlFor="input13" className="col-sm-5 col-form-label">
                  Carnet
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-id-card" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Document && "is-invalid"
                      }`}
                      id="input13"
                      placeholder="Carnet"
                      name="Document"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Document && (
                      <div className="invalid-feedback">
                        {errorMessages.Document}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input08" className="col-sm-5 col-form-label">
                  Fecha de nacimiento <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-calendar-plus"></i>
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Fecha de Nacimiento"
                      name="BirthDate"
                      onChange={handleInputChange}
                    />
                    {errorMessages.BirthDate && (
                      <div className="invalid-feedback">
                        {errorMessages.BirthDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-flex flex-column align-items-center text-center mb-5">
                <img
                  src="../../assets/images/avatars/avatar-1.png"
                  alt="Admin"
                  className=" p-1 bg-danger"
                  width={180}
                />
              </div>
              <div className="row mb-3">
                <label htmlFor="input09" className="col-sm-5 col-form-label">
                  Correo Electrónico <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Mail && "is-invalid"
                      }`}
                      id="input09"
                      placeholder="Email"
                      name="Mail"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Mail && (
                      <div className="invalid-feedback">
                        {errorMessages.Mail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input10" className="col-sm-5 col-form-label">
                  Telefono
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.PhoneNumber && "is-invalid"
                      }`}
                      id="input10"
                      placeholder="Número de teléfono"
                      name="PhoneNumber"
                      onChange={handleInputChange}
                    />
                    {errorMessages.PhoneNumber && (
                      <div className="invalid-feedback">
                        {errorMessages.PhoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input11" className="col-sm-5 col-form-label">
                  Whatssap <span style={{ color: "#999" }}>(Opcional)</span>
                </label>
                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Whatsapp && "is-invalid"
                      }`}
                      id="input11"
                      placeholder="Número de whatssap"
                      name="Whatsapp"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Whatsapp && (
                      <div className="invalid-feedback">
                        {errorMessages.Whatsapp}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input12" className="col-sm-5 col-form-label">
                  Nota <span style={{ color: "#999" }}>(Opcional)</span>
                </label>

                <div className="col-sm-7">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <textarea
                      className={`form-control ${
                        errorMessages.Note && "is-invalid"
                      }`}
                      id="input12"
                      placeholder="Ingrese alguna nota..."
                      name="Note"
                      onChange={handleInputChange}
                    ></textarea>
                    {errorMessages.Note && (
                      <div className="invalid-feedback">
                        {errorMessages.Note}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col"></div>
                <div className="col-auto ml-auto">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={handleRegisterClient}
                  >
                    <i className="bx bx-user-circle" /> Registrar cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
