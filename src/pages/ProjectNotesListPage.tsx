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
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
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
      <Box
        component={Paper}
        sx={{ width: "72%", margin: "18px auto", padding: "32px" }}
      >
        <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }} mb={1}>
            <Typography variant="h6" mb={1} sx={{ textAlign: "left" }}>
              {termData.termId}期作業ノート一覧{" "}
            </Typography>
            <Typography variant="body2" mb={1} sx={{ textAlign: "left" }}>
              （期間：{termData.startDate} 〜 {termData.endDate}）
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              navigate(
                `/createprojectnotesfolder/${termId}/createprojectnote`,
                {
                  state: termData,
                }
              )
            }
          >
            作業ノート作成
          </Button>
        </Box>
        <Divider />
        <Box sx={{ width: "100%", margin: "0 auto" }}>
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
                      <ListItem dense disableGutters disablePadding>
                        <ListItemIcon>
                          <ArticleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${projectData.termId}FY_${projectData.projectSummaryFormData.projectName}`}
                          primaryTypographyProps={{
                            fontWeight: "bold",
                            color: "text.secondary",
                          }}
                          secondary={`ID：${projectData.projectId}`}
                        />
                      </ListItem>
                    </ListItemButton>
                  </div>
                );
              })
            ) : (
              <Typography variant="h6" mt={3} color="text.secondary">
                {errorMessage}
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </>
  );
}
