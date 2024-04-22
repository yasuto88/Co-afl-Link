// pages/index.tsx
import React from "react";
import ParticipantList from "@/components/ParticipantList/ParticipantList";

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/api/fetchUser")
//     .then((response) => response.json())
//     .then((data) => {
//       // APIから取得したデータをローカルストレージに保存
//       localStorage.setItem("myDataKey", JSON.stringify(data));
//     });
  
//   return {
//     props: {
//       title: "Participant List",
//     },
//   };
// }

export default function HomePage() {
  return <ParticipantList />;
}
