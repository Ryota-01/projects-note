import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

interface TermData {
  termId: string;
  startDate: string;
  endDate: string;
}

// Home画面に表示させるコンポーネント。
// 各期の作業ノートフォルダを表示
export default function ProjectNotesFolderList() {
  const [termsData, setTermsData] = useState<TermData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTermsList = async () => {
      try {
        const termsCollectionRef = collection(db, "terms");
        const termsDocRef = await getDocs(termsCollectionRef);
        const docData: TermData[] = termsDocRef.docs.map(
          (data) => data.data() as TermData
        );
        setTermsData(docData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTermsList();
  }, []);

  const handleOnClick = (termData: TermData) => {
    navigate(`/createprojectnotesfolder/${encodeURI(termData.termId)}term`, {
      state: { termData: termData },
    });
  };
  return (
    <>
      <p>ProjectNotesFolderList</p>
      <ul>
        {termsData.length > 0 ? (
          termsData.map((termData, index) => (
            <li key={index}>
              <button
                onClick={() => handleOnClick(termData)}
              >{`${termData.termId}期 作業ノートフォルダ`}</button>
            </li>
          ))
        ) : (
          <>フォルダが存在しません。</>
        )}
      </ul>
    </>
  );
}
