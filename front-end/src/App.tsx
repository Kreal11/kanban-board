import { Route, Routes } from "react-router";
import "./styles/App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Board from "./pages/board/Board";
import Card from "./pages/card/Card";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="boards/:id" element={<Board />} />
          <Route path="cards/:id" element={<Card />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
