import React, { useEffect, useState } from "react";
import "../css/Header.css";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CreateProjectNoteFormDialog from "./CreateProjectNoteFormDialog";
import RegisterPartnerFormDialog from "./RegisterPartnerFormDialog";

export default function Header() {
  const navigate = useNavigate();
  const [isOpenCreateProjectNoteDialog, setIsOpenCreateProjectNoteDialog] =
    useState(false);
  const [isOpenRegisterPartnerDialog, setIsOpenRegisterPartnerDialog] =
    useState(false);
  const [selectedPaths, setIsSelectedPaths] = useState({
    home: false,
    registerpartner: false,
    createprojectnotesfolder: false,
    partnerslist: false,
  });
  const location = useLocation();

  useEffect(() => {
    setIsSelectedPaths({
      home: location.pathname === "/home",
      registerpartner: location.pathname === "/registerpartner",
      createprojectnotesfolder:
        location.pathname === "/createprojectnotesfolder",
      partnerslist: location.pathname === "/partnerslist",
    });
  }, [location.pathname]);

  return (
    <div className="header_wrapper">
      <h2>
        <a href="/home">LEGATO MUSIC</a>
      </h2>
      <List
        component="nav"
        sx={{ width: "100%" }}
        subheader={
          <ListSubheader sx={{ backgroundColor: "none" }}>MENU</ListSubheader>
        }
      >
        <Divider />
        <ListItemButton
          onClick={() => navigate("/home")}
          selected={selectedPaths.home}
        >
          <ListItem dense disableGutters disablePadding>
            <ListItemIcon>
              <ArticleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="作業ノート一覧"
              primaryTypographyProps={{
                color: "text.secondary",
                variant: "body2",
              }}
            />
          </ListItem>
        </ListItemButton>

        {/* 取引先登録 */}
        <ListItemButton
          onClick={() => setIsOpenRegisterPartnerDialog(true)}
          selected={selectedPaths.registerpartner}
        >
          <ListItem dense disableGutters disablePadding>
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="取引先登録"
              primaryTypographyProps={{
                color: "text.secondary",
                variant: "body2",
              }}
            />
          </ListItem>
        </ListItemButton>

        {/* 作業ノートフォルダ作成 */}
        <ListItemButton
          onClick={() => setIsOpenCreateProjectNoteDialog(true)}
          selected={selectedPaths.createprojectnotesfolder}
        >
          <ListItem dense disableGutters disablePadding>
            <ListItemIcon>
              <FolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="作業ノートフォルダ作成"
              primaryTypographyProps={{
                color: "text.secondary",
                variant: "body2",
              }}
            />
          </ListItem>
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/partnerslist")}
          selected={selectedPaths.partnerslist}
        >
          <ListItem dense disableGutters disablePadding>
            <ListItemIcon>
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="取引先一覧"
              primaryTypographyProps={{
                color: "text.secondary",
                variant: "body2",
              }}
            />
          </ListItem>
        </ListItemButton>
      </List>
      {isOpenRegisterPartnerDialog && (
        <RegisterPartnerFormDialog
          isOpenRegisterPartnerDialog={isOpenRegisterPartnerDialog}
          setIsOpenRegisterPartnerDialog={setIsOpenRegisterPartnerDialog}
        />
      )}
      {isOpenCreateProjectNoteDialog && (
        <CreateProjectNoteFormDialog
          isOpenCreateProjectNoteDialog={isOpenCreateProjectNoteDialog}
          setIsOpenCreateProjectNoteDialog={setIsOpenCreateProjectNoteDialog}
        />
      )}
    </div>
  );
}
