import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectNotesListPage from "./pages/ProjectNotesListPage";
import PartnersListPage from "./pages/PartnersListPage";
import CreateProjectNotePage from "./pages/CreateProjectNotePage";
import DetailProjectNotePage from "./pages/DetailProjectNotePage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* ホーム画面 */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* 作業ノート一覧画面 */}
        <Route
          path="/createprojectnotesfolder/:termId"
          element={<ProjectNotesListPage />}
        />

        {/* 取引先一覧画面 */}
        <Route path="/partnerslist" element={<PartnersListPage />} />

        {/* 作業ノート作成画面 */}
        <Route
          path="/createprojectnotesfolder/:termId/createprojectnote"
          element={<CreateProjectNotePage />}
        />

        {/* 作業ノート詳細画面 */}
        <Route
          path="/createprojectnotesfolder/:termId/detailprojectnote"
          element={<DetailProjectNotePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
