import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  './index.css'
import Authentication from './pages/Authentication/Authentication.jsx'
import { NavbarC } from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import EncontrosDisponivel from './pages/EncontrosDisponiveis/EncontrosDisponivel.jsx'
import EncontrosInscritos from './pages/EncontrosInscritos/EncontrosInscritos.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import { NavbarProfessor } from './components/NavbarProfessor/NavbarProfessor.jsx'
import GerenciarEncontro from './pages/GerenciarEncontro/GerenciarEncontro.jsx'
import Agenda from './pages/Agenda/Agenda.jsx'
import Sobre from './pages/Sobre/Sobre.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication/>,
    errorElement:<ErrorPage/>,
    
  },
  {
    path: '/sobre',
    element: <Sobre/>,
  
    
  },
  
  {
    path:"/home",
    element: <NavbarC/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/home",
        element:<Home/>,
      },
      {
        path:"/home/encontrosDisponivel",
        element:<EncontrosDisponivel/>
      },
      {
        path:"/home/encontrosInscritos",
        element:<EncontrosInscritos/>
      },
      {
        path:"/home/agenda",
        element:<Agenda/>
      },
   
    ]
  },
  {
    path:"/gerenciarEncontro",
    element: <NavbarProfessor/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path:"/gerenciarEncontro",
        element: <GerenciarEncontro/>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
    <RouterProvider router={router} />
  </React.StrictMode>,
)
