import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

interface ProjectSummaryFormValueData {
  projectName: string;
  person: string;
}

type ProjectSummaryFormValueDataProps = {
  setProjectSummaryFormData: React.Dispatch<
    React.SetStateAction<ProjectSummaryFormValueData[] | undefined>
  >;
};

export default function ProjectSummaryForm({
  setProjectSummaryFormData,
}: ProjectSummaryFormValueDataProps) {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<ProjectSummaryFormValueData>();

  const watchedValues = useWatch<ProjectSummaryFormValueDataProps>({ control });

  useEffect(() => {
    setProjectSummaryFormData([watchedValues]);
  }, [watchedValues, setProjectSummaryFormData]);

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
