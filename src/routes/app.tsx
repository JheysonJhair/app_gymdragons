import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute ";
import { HomePage } from "../pages/Home";
import { Users } from "../modules/user/Users";
import { NewUser } from "../modules/user/NewUser";
import { Clients } from "../modules/clientes/Clients";
import { Membresias } from "../pages/membresia/Membresia";
import { NewClient } from "../modules/clientes/NewClient";
import { Products } from "../modules/products/Products";
import { NewProduct } from "../modules/products/NewProduct";
import { MarcarAsistencia } from "../modules/asistencias/MarcarAsistencia";
import { DetailProduct } from "../modules/products/DetailProduct";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      /*VENDEDOR*/
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/operations/membership-payment/",
        element: <Membresias />,
      },
      {
        path: "/area/products/",
        element: <Products />,
      },
      {
        path: "/area/new-product/",
        element: <NewProduct />,
      },
      {
        path: "/area/detail-product/",
        element: <DetailProduct />,
      },
      {
        path: "/area/clients/",
        element: <Clients />,
      },
      {
        path: "/area/new-client/",
        element: <NewClient />,
      },
      {
        path: "/area/marcarasistencia/",
        element: <MarcarAsistencia />,
      },
      /*ADMINISTRADOR EXTRA*/
      {
        path: "/area/users/",
        element: <Users />,
      },
      {
        path: "/area/new-user/",
        element: <NewUser />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
