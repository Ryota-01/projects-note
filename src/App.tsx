import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegistePartnerPage from "./pages/RegistePartnerPage";
import CreateProjectNotesFolderPage from "./pages/CreateProjectNotesFolderPage";
import ProjectNotesListPage from "./pages/ProjectNotesListPage";
import PartnersListPage from "./pages/PartnersListPage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* ホーム画面 */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* 取引先登録ページ */}
        <Route path="/registerpartner" element={<RegistePartnerPage />} />

        {/* 作業ノートフォルダ作成画面 */}
        <Route path="/createprojectnotesfolder" element={<CreateProjectNotesFolderPage />} />

        {/* 作業ノート一覧画面 */}
        <Route path="/createprojectnotesfolder/:period" element={<ProjectNotesListPage />} />

        {/* 取引先一覧画面 */}
        <Route path="/partnerslist" element={<PartnersListPage />} />
      </Routes>
    </div>
  );
}

export default App;
