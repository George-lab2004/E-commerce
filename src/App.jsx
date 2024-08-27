import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css';
import Layout from './components/Layout/Layout.jsx';
import Brands from './components/Brands/Brands.jsx';
import Categories from './components/Categories/Categories.jsx';
import Cart from './components/Cart/Cart.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Products from './components/Products/Products.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import { Toaster } from "react-hot-toast"
import WishList from './components/WishList/WishList.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import Reset from './components/Reset-Code/Reset.jsx';
import UpPs from './components/Update-Password/UpPs.jsx';


function App() {
  const queryClient = new QueryClient()


  const routers = createBrowserRouter([{
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth>  },
      { path: "Forget", element: <ProtectedAuth><ForgetPassword/></ProtectedAuth>  },
      { path: "Code", element: <ProtectedAuth><Reset/></ProtectedAuth>  },
      { path: "update", element: <ProtectedAuth><UpPs/></ProtectedAuth>  },

      { path: "register", element: <ProtectedAuth><Register /></ProtectedAuth> },
      { path: "cart", element:<ProtectedRoutes><Cart /></ProtectedRoutes>  },
      { path: "wishlist", element:<ProtectedRoutes><WishList /></ProtectedRoutes>  },
      { path: "Products", element:<ProtectedRoutes><Products/></ProtectedRoutes>   },
      { path: "cat", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: "brand", element:<ProtectedRoutes><Brands /></ProtectedRoutes>  },
      { path: "logout", element: <Home/> },
      { path: "productDetails/:id/:category", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>   },

      { path: "*", element: <NotFound /> } // Wildcard path for NotFound
    ]
  }]);

  return (
    <>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={routers} ></RouterProvider>
     
      <ReactQueryDevtools initialIsOpen={false} />
    <Toaster 
      position="top-right"
      reverseOrder={false}
    />
     </QueryClientProvider>
    </>
  );
}

export default App;
