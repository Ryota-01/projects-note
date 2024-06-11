import CreateProjectNotesFolderForm from "../components/CreateProjectNotesFolderForm";
import Header from "../components/Header";
import PaperComponent from "../components/PaperComponent";

// 作業ノートフォルダ作成画面
export default function CreateProjectNotesFolderPage() {
  return (
    <>
      <Header />
      <PaperComponent title="作業ノートフォルダ作成" subTitle="（CreateProjectNotesFolderPage）">
        <CreateProjectNotesFolderForm />
      </PaperComponent>
    </>
  );
}
