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

interface PartnersData {
  contactInfo: string;
  name: string;
  part: string;
  partnerId: string;
  typeIsCliant: boolean;
  typeIsVender: boolean;
}

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

  console.log(partnersData.length);

  return (
    <>
      <Header />
      <PaperComponent title="取引先一覧" subTitle={`（${partnersData.length}件）`}>
        <TableContainer component={Paper} sx={{ marginTop: "32px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>取引先名</TableCell>
                <TableCell>取引タイプ</TableCell>
                <TableCell>パート</TableCell>
                <TableCell>連絡先</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partnersData.length > 0 ? (
                partnersData.map((partner, index) => (
                  <TableRow key={index}>
                    <TableCell>{partner.partnerId}</TableCell>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>
                      {partner.typeIsCliant ? <>請求先</> : <>支払先</>}
                    </TableCell>
                    {partner.part !== undefined && partner.part !== null && (
                      <TableCell>{partner.part}</TableCell>
                    )}
                    <TableCell>
                      {partner.contactInfo !== undefined &&
                        partner.contactInfo !== null && (
                          <>{partner.contactInfo}</>
                        )}
                    </TableCell>
                  </TableRow>
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
