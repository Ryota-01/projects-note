import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
type ErrorMessage = string;

export default function ProjectNotesListPage() {
  const location = useLocation();
  const termData = location.state.termData;
  const navigate = useNavigate();
  const { termId } = useParams();
  const [projectsNoteList, setProjectsNoteList] = useState<DocumentData[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>("");

  useEffect(() => {
    try {
      const fetchProjectNote = async () => {
        const projectsCollectionRef = collection(db, "projects");
        const q = query(projectsCollectionRef, where("termId", "==", termId));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((data) => data.data());
          setProjectsNoteList(data);
        } else {
          setErrorMessage("データが存在しません");
        }
      };
      fetchProjectNote();
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage("ドキュメントの取得に失敗しました");
    }
  }, []);

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
            state: termData,
          })
        }
      >
        作業ノート作成
      </button>
      <ul>
        {projectsNoteList.length > 0 ? (
          projectsNoteList.map((projectList) => {
            const projectTitle = projectList.projectSummaryFormData.map(
              (projectSummary: any) => projectSummary.projectName
            );
            return <li>{projectTitle}</li>;
          })
        ) : (
          <>{errorMessage}</>
        )}
      </ul>
    </div>
  );
}
