import React, { useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import PaperComponent from "../components/PaperComponent";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type td, &:last-child th": {
    border: 0,
  },
}));

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
        <TableContainer>
          <Table
            sx={{
              width: { xs: "95%", md: "100%" },
              margin: "20px auto",
              padding: "0 12px",
            }}
            size="small"
            aria-label="customized table"
          >
            {/* 請求先情報 */}
            <TableHead>
              <TableRow>
                <StyledTableCell>請求No.</StyledTableCell>
                <StyledTableCell>請求日</StyledTableCell>
                <StyledTableCell>請求先</StyledTableCell>
                <StyledTableCell>摘要</StyledTableCell>
                <StyledTableCell>請求金額</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectNoteData.cliantFormData.map(
                (cliantData: any, index: any) => (
                  <StyledTableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>{cliantData.billingDate}</StyledTableCell>
                    <StyledTableCell>{cliantData.cliantName}</StyledTableCell>
                    <StyledTableCell>
                      {cliantData.billingSummary}
                    </StyledTableCell>
                    <StyledTableCell>
                      {cliantData.billingAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>

            {/* 支払先情報 */}
            <TableHead>
              <TableRow>
                <StyledTableCell>カテゴリー</StyledTableCell>
                <StyledTableCell>支払日</StyledTableCell>
                <StyledTableCell>支払先</StyledTableCell>
                <StyledTableCell>摘要</StyledTableCell>
                <StyledTableCell>支払額</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectNoteData.venderFormData.map(
                (venderData: any, index: any) => (
                  <StyledTableRow>
                    <StyledTableCell>{venderData.category}</StyledTableCell>
                    <StyledTableCell>
                      {venderData.dateOfPayment}
                    </StyledTableCell>
                    <StyledTableCell>{venderData.venderName}</StyledTableCell>
                    <StyledTableCell>
                      {venderData.paymentSummary}
                    </StyledTableCell>
                    <StyledTableCell className="amount_tableData">
                      {venderData.paymentAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PaperComponent>
    </>
  );
}
