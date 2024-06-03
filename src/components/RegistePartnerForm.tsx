import React, { useRef, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export default function RegistePartnerForm() {
  const initialStateId = nanoid();
  const [isChecked, setIsChecked] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const checkbox1Ref = useRef<HTMLInputElement>(null);
  const checkbox2Ref = useRef<HTMLInputElement>(null);
  const partRef = useRef<HTMLSelectElement>(null);
  const contactInfoRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // const [docId, setDocId] = useState(initialStateId);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const name = nameRef.current?.value;
      const contactInfo = contactInfoRef.current?.value;
      const typeIsCliant = checkbox1Ref.current?.checked;
      const typeIsVender = checkbox2Ref.current?.checked;
      const part = partRef.current?.value;
      const value = {
        partnerId: initialStateId,
        name: name,
        contactInfo: contactInfo,
        typeIsCliant: typeIsCliant, // typeIsCliantがtrueなら、請求先クライアント
        typeIsVender: typeIsVender, // typeIsCliantがtrueなら、支払先クライアント
        part: part === "select" ? "" : part,
      };
      const partnersCollectionRef = collection(db, "partners");
      const q = query(partnersCollectionRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // 取引先が重複している場合
        alert("すでに取引先が存在しています。");
        throw new Error("すでに取引先が存在しています。");
      } else {
        const partnersDocRef = doc(partnersCollectionRef, initialStateId);
        await setDoc(partnersDocRef, value);
        alert("登録しました。");
        navigate("/home");
      }
    } catch (error: any) {
      console.error(error, error.message);
    }
  };

  const onChange = (event: any) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setIsChecked(false)
      console.log(event.target.checked, isChecked)
    }
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <ul>
          <li>
            <label htmlFor="name">取引先名：</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="例）西田亮太"
              ref={nameRef}
              required
            />
          </li>
          <li>
            <input
              name="partnerType[]"
              id="cliant"
              type="checkbox"
              value="請求先"
              ref={checkbox1Ref}
              onChange={onChange}
              required={isChecked}
            />
            <label htmlFor="cliant">請求先</label>
            <input
              name="partnerType[]"
              id="vender"
              type="checkbox"
              value="支払先"
              ref={checkbox2Ref}
              onChange={onChange}
              required={isChecked}
            />
            <label htmlFor="vender">支払先</label>
          </li>
          <li>
            <label htmlFor="part">パート：</label>
            <select name="part" id="part" ref={partRef}>
              <option value="select">選択してください(任意)</option>
              <option value="strings">ストリングス</option>
              <option value="drums">ドラム</option>
              <option value="guiter">ギター</option>
              <option value="bass">ベース</option>
              <option value="chorus">コーラス</option>
              <option value="arranger">アレンジャー</option>
              <option value="engineer">エンジニア</option>
              <option value="conductor">コンダクター</option>
            </select>
          </li>
          <li>
            <label htmlFor="contactInfo">連絡先：</label>
            <input
              name="contactInfo"
              id="contactInfo"
              type="text"
              ref={contactInfoRef}
            />
          </li>
        </ul>
        <input type="submit" />
      </form>
    </>
  );
}
