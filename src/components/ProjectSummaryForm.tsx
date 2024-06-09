import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProjectSummaryFormValueData = {
  projectName?: string;
  person?: string;
};

type ProjectSummaryFormValueDataProps = {
  setProjectSummaryFormData: React.Dispatch<
    React.SetStateAction<ProjectSummaryFormValueData>
  >;
};

export default function ProjectSummaryForm({
  setProjectSummaryFormData,
}: ProjectSummaryFormValueDataProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ProjectSummaryFormValueData>();

  useEffect(() => {
    const watchedValues = watch((value, { name, type }) => {
      setProjectSummaryFormData(value);
    });
    return () => watchedValues.unsubscribe();
  }, [watch, setProjectSummaryFormData]);

  return (
    <div>
      <ul>
        <li>
          <label htmlFor="projectName">プロジェクト名：</label>
          <input
            {...register("projectName", {
              required: "プロジェクト名を入力してください",
            })}
            type="text"
            id="projectName"
            placeholder="テストプロジェクト"
          />
        </li>
        {errors.projectName && <div>{errors.projectName.message}</div>}
        <li>
          <label htmlFor="person">担当者：</label>
          <input
            {...register("person", {
              required: "担当者を入力してください",
            })}
            type="text"
            id="person"
          />
        </li>
        {errors.person && <div>{errors.person.message}</div>}
      </ul>
    </div>
  );
}
