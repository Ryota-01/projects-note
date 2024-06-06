import React, { useRef } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import { serverTimestamp } from "firebase/firestore";
import { useFieldArray, useForm, SubmitHandler } from "react-hook-form";

interface ProjectNoteValueData {
  billingDate: Date;
  cliantName: string;
  billingSummary: string;
  billingAmount: string;
}

interface FormValues {
  projectName: string;
  person: string;
  projectNoteValueData: ProjectNoteValueData[];
}

export default function CreateProjectNotePage() {
  const location = useLocation();
  const termData = location.state;
  const projectNameRef = useRef<HTMLInputElement>(null); //プロジェクト名
  const personRef = useRef<HTMLInputElement>(null); //担当者
  const billingDateRef = useRef<HTMLInputElement>(null); //請求日
  const cliantNameRef = useRef<HTMLInputElement>(null); //請求先名
  const billingSummaryRef = useRef<HTMLInputElement>(null); //摘要
  const billingAmountRef = useRef<HTMLInputElement>(null); //請求額
  const categoryRef = useRef<HTMLInputElement>(null); //カテゴリー
  const dateOfPaymentRef = useRef<HTMLInputElement>(null); //支払日
  const venderNameRef = useRef<HTMLInputElement>(null); //取引先名(支払い先)
  const paymentSummaryRef = useRef<HTMLInputElement>(null); //支払い摘要
  const paymentAmountRef = useRef<HTMLInputElement>(null); //支払額
  const projectId = () => {
    const nanoId = nanoid();
    const date = new Date();
    const month = date.getMonth() + 1;
    const projectId = `${termData.termId}FY0${month}_${nanoId}`;
    return projectId;
  };
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      projectNoteValueData: [
        {
          billingDate: new Date(),
          cliantName: "",
          billingSummary: "",
          billingAmount: "",
        },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "projectNoteValueData",
    // keyName: "key", // デフォルトはidだが、keyに変更
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  // const handleRegisterProject = (data: FormValues) => {
  //   console.log(data);
  //   // e.preventDefault();
  //   console.log(billingDateRef.current?.value);
  //   // projectsコレクションに保存する値
  //   const projectValue = {
  //     projectId: projectId(),
  //     projectName: projectNameRef.current?.value,
  //     cliantNames: [cliantNameRef.current?.value],
  //     termId: termData.termId,
  //     createdAt: serverTimestamp,
  //     person: personRef.current?.value,
  //   };
  //   console.log(projectValue);
  //   // transactionコレクションに保存する値
  //   const transactionValue = {
  //     billingDate: billingDateRef.current?.value,
  //     billingSummary: billingSummaryRef.current?.value,
  //     billingAmount: billingAmountRef.current?.value,
  //     category: categoryRef.current?.value,
  //     dateOfPayment: dateOfPaymentRef.current?.value,
  //     venderName: venderNameRef.current?.value,
  //     paymentSummary: paymentSummaryRef.current?.value,
  //     paymentAmount: paymentAmountRef.current?.value,
  //   };
  // };

  return (
    <>
      <Header />
      <p>CreateProjectNote</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <span>FY：</span>
            <span>{termData.termId}FY</span>
          </li>
          <li>
            <label htmlFor="projectName">プロジェクト名：</label>
            <input
              type="text"
              name="projectName"
              id="projectName"
              // ref={projectNameRef}
              // value="テストプロジェクト"
              required
            />
          </li>
          <li>
            <label htmlFor="person">担当者：</label>
            <input
              type="text"
              name="person"
              id="person"
              // ref={personRef}
              // value="西田亮太"
              required
            />
          </li>
        </ul>
        <div>
          <p>ーーー収入の部ーーー</p>
          <ul>
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <li>
                    <label htmlFor="billingDate">請求日：</label>
                    <input
                      {...register(
                        `projectNoteValueData.${index}.billingDate` as const,
                        {
                          required: true,
                        }
                      )}
                      type="date"
                      id="billingDate"
                    />
                  </li>
                  <li>
                    <label htmlFor="cliantName">取引先名：</label>
                    <input
                      {...register(
                        `projectNoteValueData.${index}.cliantName` as const,
                        {
                          required: true,
                        }
                      )}
                      type="text"
                      id="cliantName"
                      // value="株式会社レガート・ミュージック"
                    />
                  </li>
                  <li>
                    <label htmlFor="billingSummary">摘要：</label>
                    <input
                      {...register(
                        `projectNoteValueData.${index}.billingSummary` as const,
                        {
                          required: true,
                        }
                      )}
                      type="text"
                      id="billingSummary"
                      // value="楽曲制作費一式"
                    />
                  </li>
                  <li>
                    <label htmlFor="billingAmount">請求金額：</label>
                    <input
                      {...register(
                        `projectNoteValueData.${index}.billingAmount` as const,
                        {
                          required: true,
                        }
                      )}
                      type="tel"
                      id="billingAmount"
                      // value="110000"
                    />
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <button
          onClick={() =>
            append({
              billingDate: new Date(),
              cliantName: "",
              billingSummary: "",
              billingAmount: "",
            })
          }
        >
          1件追加
        </button>
        {/* <div>
          <p>ーーー支出の部ーーー</p>
          <ul>
            <li>
              <label htmlFor="category">カテゴリー：</label>
              <input
                type="text"
                name="category"
                id="category"
                ref={categoryRef}
                value="ミュージシャン"
                required
              />
            </li>
            <li>
              <label htmlFor="dateOfPayment">支払日：</label>
              <input
                type="date"
                name="dateOfPayment"
                id="dateOfPayment"
                ref={dateOfPaymentRef}
                required
              />
            </li>
            <li>
              <label htmlFor="venderName">取引先名：</label>
              <input
                type="text"
                name="venderName"
                id="venderName"
                ref={venderNameRef}
                value="今泉洋"
                required
              />
            </li>
            <li>
              <label htmlFor="paymentSummary">摘要：</label>
              <input
                type="text"
                name="paymentSummary"
                id="paymentSummary"
                ref={paymentSummaryRef}
                value="ギター演奏料"
                required
              />
            </li>
            <li>
              <label htmlFor="paymentAmount">金額：</label>
              <input
                type="tel"
                name="paymentAmount"
                id="paymentAmount"
                ref={paymentAmountRef}
                value="66000"
                required
              />
            </li>
          </ul>
        </div> */}
        <input type="submit" value="登録" />
      </form>
    </>
  );
}
