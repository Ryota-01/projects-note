import React, { useEffect, useRef, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  DialogContentText,
  Grid,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { nanoid } from "nanoid";
import ErrorAlert from "./Alerts";
import CustomizedSnackbars from "./Snackbars";

interface Props {
  isOpenRegisterPartnerDialog: boolean;
  setIsOpenRegisterPartnerDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterPartnerFormDialog(props: Props) {
  const initialStateId = nanoid();
  const [isChecked, setIsChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const checkbox1Ref = useRef<HTMLInputElement>(null);
  const checkbox2Ref = useRef<HTMLInputElement>(null);
  const partRef = useRef<HTMLSelectElement>(null);
  const contactInfoRef = useRef<HTMLInputElement>(null);
  const handleClose = () => {
    props.setIsOpenRegisterPartnerDialog(false);
  };

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
        // alert("すでに取引先が存在しています。");
        setIsError(true);
        setErrorMessage("すでに取引先が存在しています。")
      } else {
        const partnersDocRef = doc(partnersCollectionRef, initialStateId);
        await setDoc(partnersDocRef, value);
        alert("登録しました。");
      }
    } catch (error: any) {
      console.error(error, error.message);
      setErrorMessage(`${error.message}`);
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

  useEffect(() => {
    setOpen(props.isOpenRegisterPartnerDialog);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>取引先登録</DialogTitle>
        <DialogContent>
          {isError && <ErrorAlert message={errorMessage} />}
          {isSuccess && (
            <CustomizedSnackbars
              message={successMessage}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
          )}
          {/* <DialogContentText>
            フォルダを作成する前に、今期のフォルダが事前に作成しているかご確認ください。
          </DialogContentText> */}
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={1}>
              <Grid item md={12}>
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
              </Grid>
              <Grid item md={12}>
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
              </Grid>
              <Grid item md={12}>
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
              </Grid>
              <Grid item md={12}>
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
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button type="submit">登録</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
