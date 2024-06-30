import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute ";
import { HomePage } from "../pages/Home";
import { Users } from "../modules/user/Users";
import { NewUser } from "../modules/user/NewUser";
import { Clients } from "../modules/clientes/Clients";
import { MembershipPayment } from "../pages/membresia/MembershipPayment";
import { NewClient } from "../modules/clientes/NewClient";
import { Products } from "../modules/products/Products";
import { NewProduct } from "../modules/products/NewProduct";
import { MarkAssistance } from "../modules/Assists/MarkAssistance";
import { DetailProduct } from "../modules/products/DetailProduct";
import { Assists } from "../modules/Assists/Assists";
import { Memberships } from "../modules/membership/Membership";
import { Reports } from "../modules/reports/Reports";
import { ReportsTable } from "../modules/reports/ReportsTable";
import { ClientMembership } from "../modules/clientes/ClienteMembership";

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
        element: <MembershipPayment />,
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
        path: "/area/detail-product/:productId",
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
        path: "/area/client-membership/",
        element: <ClientMembership />,
      },
      {
        path: "/area/mark-assistance/",
        element: <MarkAssistance />,
      },
      {
        path: "/area/assists/",
        element: <Assists />,
      },
      {
        path: "/area/membership/",
        element: <Memberships />,
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
        path: "/area/reports/",
        element: <Reports />,
      },
      {
        path: "/area/reports-table/",
        element: <ReportsTable />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
