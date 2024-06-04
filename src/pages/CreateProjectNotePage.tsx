import React, { useRef } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function CreateProjectNotePage() {
  const location = useLocation();
  const termData = location.state;
  const projectNameRef = useRef<HTMLInputElement>(null);
  const personRef = useRef<HTMLInputElement>(null);
  const billingDateRef = useRef<HTMLInputElement>(null);
  const cliantNameRef = useRef<HTMLInputElement>(null);
  const billingSummaryRef = useRef<HTMLInputElement>(null);
  const billingAmountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const dateOfPaymentRef = useRef<HTMLInputElement>(null);
  const venderNameRef = useRef<HTMLInputElement>(null);
  const paymentSummaryRef = useRef<HTMLInputElement>(null);
  const paymentAmountRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(
    //   projectNameRef.current?.value,
    //   personRef.current?.value,
    //   billingDateRef.current?.value,
    //   cliantNameRef.current?.value,
    //   billingSummaryRef.current?.value,
    //   billingAmountRef.current?.value,
    //   categoryRef.current?.value,
    //   dateOfPaymentRef.current?.value,
    //   venderNameRef.current?.value,
    //   paymentSummaryRef.current?.value,
    //   paymentAmountRef.current?.value
    // );
    const value = {
      projectName: projectNameRef.current?.value,
      person: personRef.current?.value,
      billingDate: billingDateRef.current?.value,
      cliantName: cliantNameRef.current?.value,
      billingSummary: billingSummaryRef.current?.value,
      billingAmount: billingAmountRef.current?.value,
      category: categoryRef.current?.value,
      dateOfPayment: dateOfPaymentRef.current?.value,
      venderName: venderNameRef.current?.value,
      paymentSummary: paymentSummaryRef.current?.value,
      paymentAmount: paymentAmountRef.current?.value,
      termId: termData.termId,
    };
    console.log(value);
  };

  return (
    <>
      <Header />
      <p>CreateProjectNote</p>
      <form onSubmit={handleOnSubmit}>
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
              ref={projectNameRef}
              value="テストプロジェクト"
              required
            />
          </li>
          <li>
            <label htmlFor="person">担当者：</label>
            <input
              type="text"
              name="person"
              id="person"
              ref={personRef}
              value="西田亮太"
              required
            />
          </li>
        </ul>
        <div>
          <p>ーーー収入の部ーーー</p>
          <ul>
            <li>
              <label htmlFor="billingDate">請求日：</label>
              <input
                type="date"
                name="billingDate"
                id="billingDate"
                ref={billingDateRef}
                required
              />
            </li>
            <li>
              <label htmlFor="cliantName">取引先名：</label>
              <input
                type="text"
                name="cliantName"
                id="cliantName"
                ref={cliantNameRef}
                value="株式会社レガート・ミュージック"
                required
              />
            </li>
            <li>
              <label htmlFor="billingSummary">摘要：</label>
              <input
                type="text"
                name="billingSummary"
                id="billingSummary"
                ref={billingSummaryRef}
                value="楽曲制作費一式"
                required
              />
            </li>
            <li>
              <label htmlFor="billingAmount">請求金額：</label>
              <input
                type="tel"
                name="billingAmount"
                id="billingAmount"
                ref={billingAmountRef}
                value="110000"
                required
              />
            </li>
          </ul>
        </div>
        <div>
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
        </div>
        <input type="submit" value="登録" />
      </form>
    </>
  );
}
