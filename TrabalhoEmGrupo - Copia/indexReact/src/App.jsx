import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './Index'
import Livro from "./Livro";

{/*Precisei dar um "npm install react-router-dom" pra redirecionar automaticamente para a página Livro.jsx após a busca*/}
export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/livro" element={<Livro />} />
      </Routes>
    </Router>
  )
}
