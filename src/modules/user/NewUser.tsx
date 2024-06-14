import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { User } from "../../types/User";
import { crearUsuario } from "../../services/Usuario";
import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../../utils/validations";

type PartialUser = Partial<Record<keyof User, string | undefined>>;

export function NewUser() {
  const navigate = useNavigate();
  const [nuevoUsuario, setNuevoUsuario] = useState<PartialUser>({});
  const [errorMessages, setErrorMessages] = useState({
    UserName: "",
    Password: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Dni: "",
    Access: "",
    Mail: "",
    BirthDate: "",
    RoleId: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  //---------------------------------------------------------------- POST USER
  type UsuarioKey = keyof User;
  const handleRegistrarUsuario = async () => {
    try {
      const requiredFields: UsuarioKey[] = [
        "UserName",
        "Password",
        "FirstName",
        "LastName",
        "PhoneNumber",
        "Dni",
        "Mail",
        "BirthDate",
        "RoleId",
      ];

      let errores: { [key in UsuarioKey]?: string } = {};
      requiredFields.forEach((field) => {
        const error = validateField(field as string, nuevoUsuario[field]);
        if (error) {
          errores[field] = error;
        }
      });

      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        ...errores,
      }));

      if (Object.keys(errores).length > 0) {
        Swal.fire({
          title: "Errsssor!",
          text: "error.message",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      await crearUsuario(nuevoUsuario as Partial<User>);
      Swal.fire({
        title: "Correcto!",
        text: "El usuario se registró correctamente!",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      navigate("/area/usuarios/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "error.message",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar el nuevo usuario:", error);
    }
  };
  //------------------------------------ INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };
  //------------------------------------ VALIDATION
  const validateField = (
    name: string,
    value: string | undefined
  ): string | null => {
    switch (name) {
      case "Dni":
        return validateDNI(value) || validateRequiredField(value) || null;
      case "Mail":
        return validateEmail(value) || validateRequiredField(value) || null;
      case "PhoneNumber":
        return (
          validatePhoneNumber(value) || validateRequiredField(value) || null
        );
      case "Password":
        return validatePassword(value) || validateRequiredField(value) || null;
      default:
        return validateRequiredField(value) || null;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Usuario</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo usuario
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="card p-4">
          <div className="row">
            <div className="col-sm-6">
              <div className="row mb-3">
                <label htmlFor="input01" className="col-sm-4 col-form-label">
                  Nombres
                </label>
                <div className="col-sm-8">
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
                <label htmlFor="input02" className="col-sm-4 col-form-label">
                  Apellidos
                </label>
                <div className="col-sm-8">
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
                <label htmlFor="input03" className="col-sm-4 col-form-label">
                  DNI
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-id-card" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Dni && "is-invalid"
                      }`}
                      id="input03"
                      placeholder="Dni"
                      name="Dni"
                      onChange={handleInputChange}
                    />
                    {errorMessages.Dni && (
                      <div className="invalid-feedback">
                        {errorMessages.Dni}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input04" className="col-sm-4 col-form-label">
                  Telefono
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-phone" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.PhoneNumber && "is-invalid"
                      }`}
                      id="input04"
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
                <label htmlFor="input05" className="col-sm-4 col-form-label">
                  Correo Electrónico
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-envelope" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.Mail && "is-invalid"
                      }`}
                      id="input05"
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
            </div>
            <div className="col-sm-6">
              <div className="row mb-3">
                <label htmlFor="input06" className="col-sm-4 col-form-label">
                  Usuario
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user" />
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        errorMessages.UserName && "is-invalid"
                      }`}
                      id="input06"
                      placeholder="Usuario"
                      name="UserName"
                      onChange={handleInputChange}
                    />
                    {errorMessages.UserName && (
                      <div className="invalid-feedback">
                        {errorMessages.UserName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input07" className="col-sm-4 col-form-label">
                  Contraseña
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-lock" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        errorMessages.Password && "is-invalid"
                      }`}
                      id="input07"
                      placeholder="Contraseña"
                      name="Password"
                      value={nuevoUsuario.Password || ""}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i className="bx bx-hide" />
                      ) : (
                        <i className="bx bx-show" />
                      )}
                    </button>
                    {errorMessages.Password && (
                      <div className="invalid-feedback">
                        {errorMessages.Password}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="input08" className="col-sm-4 col-form-label">
                  Rol
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-user-circle" />
                    </span>
                    <select
                      className={`form-select ${
                        errorMessages.RoleId && "is-invalid"
                      }`}
                      name="RoleId"
                      onChange={handleInputChange}
                      id="input08"
                    >
                      <option>Seleccionar rol</option>
                      <option value={1}>Administrador</option>
                      <option value={2}>Vendedor</option>
                    </select>
                    {errorMessages.RoleId && (
                      <div className="invalid-feedback">
                        {errorMessages.RoleId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input09" className="col-sm-4 col-form-label">
                  Aceeso
                </label>
                <div className="col-sm-8">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bx bx-log-in" />
                    </span>
                    <select
                      className={`form-select ${
                        errorMessages.Access && "is-invalid"
                      }`}
                      name="Access"
                      onChange={handleInputChange}
                      id="input09"
                    >
                      <option>Seleccionar acceso</option>
                      <option value="true">Admitir</option>
                      <option value="false">Denegar</option>
                    </select>
                    {errorMessages.Access && (
                      <div className="invalid-feedback">
                        {errorMessages.Access}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="input08" className="col-sm-4 col-form-label">
                  Fecha de nacimiento
                </label>
                <div className="col-sm-8">
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
              <div className="row mt-4">
                <div className="col"></div>
                <div className="col-auto ml-auto">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={handleRegistrarUsuario}
                  >
                    <i className="bx bx-user-circle" /> Registrar Usuario
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
