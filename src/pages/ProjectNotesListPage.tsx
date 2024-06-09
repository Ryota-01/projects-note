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
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

type ErrorMessage = string;

export default function ProjectNotesListPage() {
  const location = useLocation();
  const termData = location.state.termData;
  const navigate = useNavigate();
  const { termId } = useParams();
  const [projectsNoteList, setProjectsNoteList] = useState<DocumentData[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>("");

  console.log(projectsNoteList);
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
    <>
      <Header />
      <div>
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
        <Box sx={{ width: "55%", margin: "48px auto" }}>
          <List>
            {projectsNoteList.length > 0 ? (
              projectsNoteList.map((projectData, index) => {
                return (
                  <div key={index}>
                    <ListItemButton
                      onClick={() =>
                        navigate(
                          `/createprojectnotesfolder/${termId}/detailprojectnote`,
                          {
                            state: projectData,
                          }
                        )
                      }
                    >
                      <ListItem>
                        <ListItemIcon>
                          <ArticleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${projectData.termId}FY_${projectData.projectSummaryFormData.projectName}`}
                          secondary={`ID：${projectData.projectId}`}
                          color="text.secondary"
                        />
                      </ListItem>
                    </ListItemButton>
                    <Divider />
                  </div>
                );
              })
            ) : (
              <>{errorMessage}</>
            )}
          </List>
        </Box>
      </div>
    </>
  );
}
