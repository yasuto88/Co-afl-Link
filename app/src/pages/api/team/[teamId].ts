import { Team } from "@/interface/types";
import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../co-afl-app-firebase-adminsdk-8duq1-b85223fa56.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const COLLECTION_NAME = "test";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  const teamId = req.query.teamId as string;

  if (req.method === "GET") {
    try {
      // 指定されたuserIdのドキュメントを取得
      if (teamId) {
        const docRef = db.collection("teams").doc(teamId!.toString());
        const doc = await docRef.get();

        if (!doc.exists) {
          // ドキュメントが存在しない場合は404エラーを返す
          return res.status(404).json({ error: "Team not found" });
        }
        const teamData = doc.data() as Team; // Teamの型にキャスト
        // 必要なデータに絞り込んでレスポンスを返す
        const teamResponse: Team = {
          id: doc.id,
          name: teamData.name ?? "",
          member_ids: teamData.member_ids ?? [],
          message_ids: teamData.message_ids ?? [],
          file_ids: teamData.file_ids ?? [],
        };

        console.log("Success to fetch team data for:", teamId);
        res.status(200).json(teamResponse);
      }
    } catch (error) {
      console.error("Failed to fetch team data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // GET以外のメソッドは許可しない
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
