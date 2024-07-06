import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PaperComponent from "../components/PaperComponent";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

interface PartnersData {
  contactInfo: string;
  name: string;
  part: string;
  partnerId: string;
  typeIsCliant: boolean;
  typeIsVender: boolean;
}

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

export default function PartnersListPage() {
  const [partnersData, setPartnersData] = useState<PartnersData[]>([]);
  const [isEmptyMessage, setIsEmptyMessage] = useState<string>("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersCollectionRef = collection(db, "partners");
        const partnersDocSnapshot = await getDocs(partnersCollectionRef);
        if (partnersDocSnapshot.empty === true) {
          setIsEmptyMessage("ドキュメントが存在しません");
        } else {
          const partners: PartnersData[] = partnersDocSnapshot.docs.map(
            (data) => data.data() as PartnersData
          );
          setPartnersData(partners);
        }
      } catch (error: any) {
        console.error(error, error.message);
      }
    };
    fetchPartners();
  }, []);

  return (
    <>
      <Header />
      <PaperComponent
        title="取引先一覧"
        subTitle={`（${partnersData.length}件）`}
      >
        <TableContainer component={Paper} sx={{ marginTop: "32px" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>取引先名</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>取引タイプ</StyledTableCell>
                <StyledTableCell>パート</StyledTableCell>
                <StyledTableCell>連絡先</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partnersData.length > 0 ? (
                partnersData.map((partner, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{partner.name}</StyledTableCell>
                    <StyledTableCell>{partner.partnerId}</StyledTableCell>
                    <StyledTableCell>
                      {partner.typeIsCliant ? <>請求先</> : <>支払先</>}
                    </StyledTableCell>
                    {partner.part !== undefined && partner.part !== null && (
                      <StyledTableCell>{partner.part}</StyledTableCell>
                    )}
                    <StyledTableCell>
                      {partner.contactInfo !== undefined &&
                        partner.contactInfo !== null && (
                          <>{partner.contactInfo}</>
                        )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <>{isEmptyMessage}</>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PaperComponent>
    </>
  );
}
