import React from "react";
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
import { useNavigate } from "react-router-dom";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header_wrapper">
      <h2>
        <a href="/home">LEGATO MUSIC 作業ノート</a>
      </h2>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        subheader={<ListSubheader>MENU</ListSubheader>}
      >
        <Divider />
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItem>
            <ListItemIcon>
              <ArticleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="作業ノート一覧" />
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/registerpartner")}>
          <ListItem>
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="取引先登録" />
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/createprojectnotesfolder")}>
          <ListItem>
            <ListItemIcon>
              <FolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="作業ノートフォルダ作成" />
          </ListItem>
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/partnerslist")}>
          <ListItem>
            <ListItemIcon>
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="取引先一覧" />
          </ListItem>
        </ListItemButton>
      </List>
    </div>
  );
}
