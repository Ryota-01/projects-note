import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { DialogContentText, Grid } from "@mui/material";
import ErrorAlert from "./Alerts";
import CustomizedSnackbars from "./Snackbars";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormDialog(props: Props) {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = () => {
    props.setIsOpen(false);
  };
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
        setIsSuccess(true);
        setSuccessMessage("フォルダを作成しました");
        alert("フォルダを作成しました");
        setOpen(false);
      } else {
        console.error("フォルダが作成されています。");
        setIsError(true);
        setErrorMessage("すでにフォルダが作成されています。");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOpen(props.isOpen);
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        // onSubmit={handleOnSubmit}
        // PaperProps={{
        //   component: "form",
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries((formData as any).entries());
        //     const email = formJson.email;
        //     console.log(email);
        //     handleClose();
        //   },
        // }}
      >
        <DialogTitle>作業ノートフォルダ作成</DialogTitle>
        <DialogContent>
          {isError && <ErrorAlert message={errorMessage} />}
          {isSuccess && (
            <CustomizedSnackbars
              message={successMessage}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
          )}
          <DialogContentText>
            フォルダを作成する前に、今期のフォルダが事前に作成しているかご確認ください。
          </DialogContentText>
          <form onSubmit={handleOnSubmit} method="get">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  name="folderName"
                  id="folderName"
                  type="text"
                  placeholder="例）43"
                  variant="standard"
                  margin="dense"
                  inputRef={termRef}
                  helperText="期を入力してください（数字のみ）"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  name="startDate"
                  id="startDate"
                  type="date"
                  variant="standard"
                  margin="dense"
                  helperText="開始日を入力してください"
                  inputRef={startDateRef}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  name="endDate"
                  id="endDate"
                  type="date"
                  variant="standard"
                  margin="dense"
                  helperText="終了日を入力してください"
                  inputRef={endDateRef}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button type="submit">作成</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
