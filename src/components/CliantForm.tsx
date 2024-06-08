import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface CliantFormValueData {
  billingDate: string;
  cliantName: string;
  billingSummary: string;
  billingAmount: string;
}

interface FormValues {
  projectNoteValueData: CliantFormValueData[];
}

type CliantFormValueProps = {
  setCliantFormData: React.Dispatch<React.SetStateAction<CliantFormValueData[]>>;
};

export default function CliantForm({ setCliantFormData }: CliantFormValueProps) {
  const { register, control, watch } = useForm<FormValues>({
    defaultValues: {
      projectNoteValueData: [
        {
          billingDate: new Date().toISOString().split("T")[0], // Dateを文字列に変換
          cliantName: "株式会社レガート・ミュージック",
          billingSummary: "楽曲制作費一式",
          billingAmount: "110000",
        },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "projectNoteValueData",
  });

  const watchedCliants = watch("projectNoteValueData");

  useEffect(() => {
    setCliantFormData(watchedCliants);
  }, [watchedCliants, setCliantFormData]);

  return (
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
                    `projectNoteValueData.${index}.billingDate` as const
                  )}
                  type="date"
                  id="billingDate"
                  required
                />
              </li>
              <li>
                <label htmlFor="cliantName">取引先名：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.cliantName` as const
                  )}
                  type="text"
                  id="cliantName"
                  required
                />
              </li>
              <li>
                <label htmlFor="billingSummary">摘要：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.billingSummary` as const
                  )}
                  type="text"
                  id="billingSummary"
                  required
                />
              </li>
              <li>
                <label htmlFor="billingAmount">請求金額：</label>
                <input
                  {...register(
                    `projectNoteValueData.${index}.billingAmount` as const
                  )}
                  type="tel"
                  id="billingAmount"
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
            billingDate: new Date().toISOString().split("T")[0], // Dateを文字列に変換
            cliantName: "",
            billingSummary: "",
            billingAmount: "",
          })
        }
      >
        1件追加
      </button>
    </div>
  );
}
