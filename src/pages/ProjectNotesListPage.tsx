import React, { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProjectNotesListPage() {
  const location = useLocation();
  const termData = location.state.termData;
  const navigate = useNavigate();
  const { termId } = useParams();
  console.log(termData);

  return (
    <div>
      <Header />
      <h2>{termData.termId}期作業ノート一覧</h2>
      <h5>
        期間：{termData.startDate} 〜 {termData.endDate}
      </h5>
      <button
        onClick={() =>
          navigate(`/createprojectnotesfolder/${termId}/createprojectnote`, {
            state : termData,
          })
        }
      >
        作業ノート作成
      </button>
    </div>
  );
}
