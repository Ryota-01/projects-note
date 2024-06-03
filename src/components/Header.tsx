import React from "react";

export default function Header() {
  return (
    <>
      <h1>
        <a href="/home">LEGATO MUSIC 作業ノート</a>
      </h1>
      <button>
        <a href="/home">作業ノート一覧</a>
      </button>
      <button>
        <a href="/registerpartner">取引先登録</a>
      </button>
      <button>
        <a href="/createprojectnotesfolder">作業ノートフォルダ作成</a>
      </button>
      <button>
        <a href="/partnerslist">取引先一覧</a>
      </button>
    </>
  );
}
