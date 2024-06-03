import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function ProjectNotesListPage() {
  const location = useLocation();
  const termData = location.state.termData;
  console.log(termData);

  return (
    <div>
      <Header />
      <h2>{termData.termId}期作業ノート一覧</h2>
      <h5>期間：{termData.startDate} 〜 {termData.endDate}</h5>
    </div>
  );
}
