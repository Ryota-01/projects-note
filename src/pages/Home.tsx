import React from "react";
import Header from "../components/Header";
import ProjectNotesFolderList from "../components/ProjectNotesFolderList";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  return (
    <>
      <Header />
      <ProjectNotesFolderList />
    </>
  );
}
