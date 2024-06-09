import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function DetailProjectNotePage() {
  const location = useLocation();
  const projectNoteData = location.state;
  return (
    <>
      <Header />
      <div>
        <p>DetailProjectNotePage</p>
        <div>
          <ul>
            <li>
              <p>
                ID：
                {projectNoteData.projectId}
              </p>
              <p>
                プロジェクト名：
                {projectNoteData.projectSummaryFormData.projectName}
              </p>
              <p>担当者：{projectNoteData.projectSummaryFormData.person}</p>
            </li>
          </ul>
        </div>

        {/* 請求先情報 */}
        <div style={{ margin: "32px" }}>
          <ul>
            {projectNoteData.cliantFormData.map(
              (cliantData: any, index: any) => (
                <>
                  <li>
                    <p>請求先：{cliantData.cliantName}</p>
                    <p>摘要：{cliantData.billingSummary}</p>
                    <p>請求日：{cliantData.billingDate}</p>
                    <p>請求金額：{cliantData.billingAmount}</p>
                  </li>
                </>
              )
            )}
          </ul>
        </div>

        {/* 支払先情報 */}
        <div>
          <ul>
            {projectNoteData.venderFormData.map(
              (venderData: any, index: any) => (
                <>
                  <li>
                    <p>支払先：{venderData.venderName}</p>
                    <p>摘要：{venderData.paymentSummary}</p>
                    <p>カテゴリー：{venderData.category}</p>
                    <p>支払日：{venderData.dateOfPayment}</p>
                    <p>支払金額：{venderData.paymentAmount}</p>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
