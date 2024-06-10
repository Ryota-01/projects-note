import React from "react";
import Header from "../components/Header";
import ProjectNotesFolderList from "../components/ProjectNotesFolderList";
import { useLocation } from "react-router-dom";
import RegistePartnerPage from "./RegistePartnerPage";

export default function Home() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <ProjectNotesFolderList />
    </>
  );
}
