import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";

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

  console.log(partnersData);

  return (
    <div>
      <Header />
      <p>PartnersListPage</p>
      {partnersData.length > 0 ? (
        partnersData.map((partner, index) => (
          <ul key={index}>
            <li>ID：{partner.partnerId}</li>
            <li>名前：{partner.name}</li>
            <li>{partner.typeIsCliant && <>取引タイプ：請求先</>}</li>
            <li>{partner.typeIsCliant && <>取引タイプ：支払先</>}</li>
            {partner.part !== undefined && partner.part !== null && (
              <li>パート：{partner.part}</li>
            )}
            <li>
              {partner.contactInfo !== undefined &&
                partner.contactInfo !== null && (
                  <>連絡先：{partner.contactInfo}</>
                )}
            </li>
          </ul>
        ))
      ) : (
        <>
          <p>{isEmptyMessage}</p>
        </>
      )}
    </div>
  );
}
