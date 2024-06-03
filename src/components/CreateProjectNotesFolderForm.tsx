import React, { useRef } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreateProjectNotesFolderForm() {
  const termRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const termId = termRef.current?.value;
      const startDate = startDateRef.current?.value;
      const endDate = endDateRef.current?.value;
      const value = {
        termId: termId,
        startDate: startDate,
        endDate: endDate,
      };
      const termsCollectionRef = collection(db, "terms");
      const termsDocRef = doc(termsCollectionRef, `terms_${termId}`);
      const docSnapshot = await getDoc(termsDocRef);
      if (!docSnapshot.exists()) {
        await setDoc(termsDocRef, value);
        alert("フォルダを作成しました");
        navigate("/home");
      } else {
        console.error("フォルダが作成されています。");
        alert("すでにフォルダが作成されています");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit} method="get">
        <ul>
          <li>
            <label htmlFor="folderName">フォルダ名：</label>
            <input
              name="folderName"
              id="folderName"
              type="text"
              placeholder="例）43"
              ref={termRef}
              required
            />
            期作業ノートフォルダ
          </li>
          <li>
            <label htmlFor="startDate">開始日：</label>
            <input
              name="startDate"
              id="startDate"
              type="date"
              ref={startDateRef}
              required
            />
          </li>
          <li>
            <label htmlFor="endDate">終了日：</label>
            <input
              name="endDate"
              id="endDate"
              type="date"
              ref={endDateRef}
              required
            />
          </li>
          <input type="submit" value="フォルダを作成" />
        </ul>
      </form>
    </div>
  );
}
