import { Team, User } from "@/interface/types";
import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "teams";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = getFirestore();

  if (req.method === "GET") {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const teams: Team[] = snapshot.docs.map((doc: any) => {
      const teamData = doc.data() as Partial<Team>;
      return {
        id: doc.id,
        name: teamData.name ?? "",
        member_ids: teamData.member_ids ?? [],
        message_ids: teamData.message_ids ?? [],
        file_ids: teamData.file_ids ?? [],
      };
    });
    console.log(teams);
    console.log("Success to fetch user data");
    res.status(200).json(teams);
  } else {
    // 未サポートのHTTPメソッドの場合
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
