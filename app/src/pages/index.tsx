import React from "react";

export default function Home() {
  return (
    <div
      style={{
        display: "flex", // Flexboxを使用
        flexDirection: "column", // 子要素を縦方向に配置
        minHeight: "100vh", // 親要素の高さを画面の高さに合わせる
        // justifyContent: "space-evenly", // 子要素間に均等なスペースを設定
      }}
    >
      hello world
    </div>
  );
}
