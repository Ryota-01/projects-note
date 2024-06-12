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
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";

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
      setIsChecked(false);
      console.log(event.target.checked, isChecked);
    }
  };

  const parts = [
    {
      value: "strings",
      label: "ストリングス",
    },
    {
      value: "drums",
      label: "ドラム",
    },
    {
      value: "guiter",
      label: "ギター",
    },
    {
      value: "bass",
      label: "ベース",
    },
    {
      value: "chorus",
      label: "コーラス",
    },
    {
      value: "arranger",
      label: "アレンジャー",
    },
    {
      value: "engineer",
      label: "エンジニア",
    },
    {
      value: "conductor",
      label: "コンダクター",
    },
  ];

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Box mt={4} width="70%">
          <Box textAlign="left">
            <TextField
              name="name"
              id="name"
              type="text"
              label="取引先名"
              size="small"
              margin="dense"
              helperText="必須"
              inputRef={nameRef}
              fullWidth
              required
            />
            <FormControlLabel
              control={<Checkbox />}
              label="請求先"
              onChange={onChange}
              required={isChecked}
              inputRef={checkbox1Ref}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="支払先"
              onChange={onChange}
              required={isChecked}
              inputRef={checkbox2Ref}
            />
          </Box>
          <Box mt={2}>
            <TextField
              name="part"
              id="part"
              label="パート"
              margin="dense"
              size="small"
              helperText="選択してください（任意）"
              defaultValue=""
              inputRef={partRef}
              sx={{ textAlign: "left" }}
              fullWidth
              select
            >
              {parts.map((part) => (
                <MenuItem key={part.value} value={part.value}>
                  {part.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              name="contactInfo"
              id="contactInfo"
              label="連絡先（省略化）"
              type="text"
              size="small"
              margin="dense"
              inputRef={contactInfoRef}
              fullWidth
            />
          </Box>
          <Box mt={2} textAlign="left">
            <Button variant="contained" type="submit">
              送信
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
