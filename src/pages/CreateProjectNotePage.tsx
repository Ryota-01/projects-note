import React, { useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useForm, SubmitHandler } from "react-hook-form";
import VenderForm from "../components/VenderForm";
import CliantForm from "../components/CliantForm";
import ProjectSummaryForm from "../components/ProjectSummaryForm";
import PaperComponent from "../components/PaperComponent";

type ProjectSummaryFormValueData = {
  projectName?: string;
  person?: string;
};

interface CliantFormValueData {
  billingDate: string;
  cliantName: string;
  billingSummary: string;
  billingAmount: string;
}

interface VenderFormValueData {
  category: string; // カテゴリー
  venderName: string; // 取引先名
  dateOfPayment: string; // 支払日
  paymentSummary: string; // 摘要
  paymentAmount: string; // 支払額
}

interface FormValues {
  projectSummaryFormValueData: ProjectSummaryFormValueData[];
  cliantFormValueData: CliantFormValueData[];
  venderFormValueData: VenderFormValueData[];
}

export default function CreateProjectNotePage() {
  const location = useLocation();
  const termData = location.state;
  const [projectSummaryFormData, setProjectSummaryFormData] =
    useState<ProjectSummaryFormValueData>({});
  const [cliantFormData, setCliantFormData] = useState<CliantFormValueData[]>(
    []
  );
  const [venderFormData, setVenderFormData] = useState<VenderFormValueData[]>(
    []
  );
  const { handleSubmit } = useForm<FormValues>();

  const handleRegisterProject: SubmitHandler<FormValues> = async () => {
    const projectId = () => {
      const nanoId = nanoid();
      const date = new Date();
      const month = date.getMonth() + 1;
      const projectId = `${termData.termId}FY0${month}_${nanoId}`;
      return projectId;
    };
    try {
      const projectsCollectionRef = collection(db, "projects");
      const q = query(
        projectsCollectionRef,
        where("projectId", "==", projectId())
      );
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        alert("すでにプロジェクト情報が存在しています。");
      } else {
        const projectsDocRef = doc(projectsCollectionRef, projectId());
        await setDoc(projectsDocRef, {
          projectId: projectId(),
          termId: termData.termId,
          projectSummaryFormData,
          cliantFormData,
          venderFormData,
        });
        alert("プロジェクト情報を保存しました");
        console.log("プロジェクト情報を保存しました");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <PaperComponent title={`${termData.termId}FY作業ノート作成`} subTitle="">
        <div>
          <p></p>
          <span>FY：</span>
          <span>{termData.termId}FY</span>

          <form onSubmit={handleSubmit(handleRegisterProject)}>
            <ProjectSummaryForm
              setProjectSummaryFormData={setProjectSummaryFormData}
            />

            {/* 収入の部 */}
            <CliantForm setCliantFormData={setCliantFormData} />

            {/* 支出の部 */}
            <VenderForm setVenderFormData={setVenderFormData} />
            <input type="submit" value="登録" />
          </form>
        </div>
      </PaperComponent>
    </>
  );
}
