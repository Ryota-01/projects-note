import React, { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PaperComponent from "../components/PaperComponent";
import "../css/DetailProjectNote.css";
import ProjectNoteTable from "./ProjectNoteTable";

export default function DetailProjectNotePage() {
  const location = useLocation();
  const projectNoteData = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (projectNoteData.length === 0) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Header />
      <PaperComponent
        title={projectNoteData.projectSummaryFormData.projectName}
        subTitle={`ID：${projectNoteData.projectId}`}
      >
      {/* <ProjectNoteTable /> */}
        <p>担当者：{projectNoteData.projectSummaryFormData.person}</p>

        {/* 請求先情報 */}
        <table className="detailProjectNote_cliantTable">
          <thead>
            <tr>
              <th colSpan={5} className="income">
                収入の部
              </th>
            </tr>
            <tr>
              <th>請求No.</th>
              <th>請求日</th>
              <th>請求先</th>
              <th>摘要</th>
              <th>請求金額</th>
            </tr>
          </thead>
          <tbody>
            {projectNoteData.cliantFormData.map(
              (cliantData: any, index: any) => (
                <tr>
                  <td></td>
                  <td>{cliantData.billingDate}</td>
                  <td>{cliantData.cliantName}</td>
                  <td>{cliantData.billingSummary}</td>
                  <td className="amount_tableData">
                    {cliantData.billingAmount}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* 支払先情報 */}
        <table className="detailProjectNote_venderTable">
          <thead>
            <tr>
              
              <th colSpan={5} className="expenditures">
                支出の部
              </th>
            </tr>
            <tr>
              <th>カテゴリー</th>
              <th>支払日</th>
              <th>支払先</th>
              <th>摘要</th>
              <th>支払額</th>
            </tr>
          </thead>
          <tbody>
            {projectNoteData.venderFormData.map(
              (venderData: any, index: any) => (
                <tr>
                  <td>{venderData.category}</td>
                  <td>{venderData.dateOfPayment}</td>
                  <td>{venderData.venderName}</td>
                  <td>{venderData.paymentSummary}</td>
                  <td className="amount_tableData">
                    {venderData.paymentAmount}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </PaperComponent>
    </>
  );
}
