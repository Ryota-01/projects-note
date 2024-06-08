import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface VenderFormValueData {
  category: string; // カテゴリー
  venderName: string; // 取引先名
  dateOfPayment: string; // 支払日
  paymentSummary: string; // 摘要
  paymentAmount: string; // 支払額
}

interface FormValues {
  projectNoteValueData: VenderFormValueData[];
}

type VenderFormValueProps = {
  setVenderFormData: React.Dispatch<React.SetStateAction<VenderFormValueData[]>>;
};

export default function VenderForm({
  setVenderFormData,
}: VenderFormValueProps) {
  const { register, control, watch } = useForm<FormValues>({
    defaultValues: {
      projectNoteValueData: [
        {
          category: "演奏料",
          venderName: "西田亮太", // 取引先名
          dateOfPayment: new Date().toISOString().split("T")[0], // Dateを文字列に変換
          paymentSummary: "ギター演奏料",
          paymentAmount: "50000",
        },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "projectNoteValueData",
  });

  const watchedVenders = watch("projectNoteValueData");

  useEffect(() => {
    setVenderFormData(watchedVenders);
  }, [watchedVenders, setVenderFormData]);

  return (
    <div>
      <p>ーーー支出の部ーーー</p>
      <ul>
        {fields.map((field, index) => {
          return (
            <div key={index}>
              <li>
                <label htmlFor="category">カテゴリー：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.category` as const
                  )}
                  type="text"
                  id="category"
                  required
                />
              </li>
              <li>
                <label htmlFor="dateOfPayment">支払日：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.dateOfPayment` as const
                  )}
                  type="date"
                  id="dateOfPayment"
                  required
                />
              </li>
              <li>
                <label htmlFor="venderName">取引先名：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.venderName` as const
                  )}
                  type="text"
                  id="venderName"
                  required
                />
              </li>
              <li>
                <label htmlFor="paymentSummary">摘要：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.paymentSummary` as const
                  )}
                  type="text"
                  id="paymentSummary"
                  required
                />
              </li>
              <li>
                <label htmlFor="paymentAmount">金額：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.paymentAmount` as const
                  )}
                  type="tel"
                  id="paymentAmount"
                  required
                />
              </li>
            </div>
          );
        })}
      </ul>
      <button
        onClick={() =>
          append({
            category: "",
            venderName: "", // 取引先名
            dateOfPayment: new Date().toISOString().split("T")[0], // Dateを文字列に変換
            paymentSummary: "",
            paymentAmount: "",
          })
        }
      >
        1件追加
      </button>
    </div>
  );
}
