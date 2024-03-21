import { Route, Routes } from "react-router";
import "./styles/App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import { lazy } from "react";

const LazyBoard = lazy(() => import("./pages/board/Board"));
const LazyCard = lazy(() => import("./pages/card/Card"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="boards/:id" element={<LazyBoard />} />
          <Route path="cards/:id" element={<LazyCard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
