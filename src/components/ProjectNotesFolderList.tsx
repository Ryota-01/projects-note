import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PaperComponent from "./PaperComponent";

interface TermData {
  termId: string;
  startDate: string;
  endDate: string;
}

// Home画面に表示させるコンポーネント。
// 各期の作業ノートフォルダを表示
export default function ProjectNotesFolderList() {
  const [termsData, setTermsData] = useState<TermData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTermsList = async () => {
      try {
        const termsCollectionRef = collection(db, "terms");
        const termsDocRef = await getDocs(termsCollectionRef);
        const docData: TermData[] = termsDocRef.docs.map(
          (data) => data.data() as TermData
        );
        setTermsData(docData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTermsList();
  }, []);

  const handleOnClick = (termData: TermData) => {
    navigate(`/createprojectnotesfolder/${encodeURI(termData.termId)}`, {
      state: { termData: termData },
    });
  };
  return (
    <PaperComponent title="作業ノート一覧" subTitle="">
      <Grid md={12}>
        <List>
          {termsData.length > 0 ? (
            termsData.map((termData, index) => (
              <>
                <ListItemButton onClick={() => handleOnClick(termData)}>
                  <ListItem dense disableGutters disablePadding>
                    <ListItemIcon>
                      <FolderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${termData.termId}期 作業ノートフォルダ`}
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        color: "text.secondary",
                      }}
                    />
                  </ListItem>
                </ListItemButton>
              </>
            ))
          ) : (
            <>フォルダが存在しません。</>
          )}
        </List>
      </Grid>
    </PaperComponent>
  );
}
