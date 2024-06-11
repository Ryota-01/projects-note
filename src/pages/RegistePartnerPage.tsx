import React from "react";
import Header from "../components/Header";
import RegistePartnerForm from "../components/RegistePartnerForm";
import PaperComponent from "../components/PaperComponent";

// 取引先登録ページ
export default function RegistePartnerPage() {
  return (
    <>
      <Header />
      <PaperComponent title="取引先登録" subTitle="（RegistePartnerPage）">
        <RegistePartnerForm />
      </PaperComponent>
    </>
  );
}
