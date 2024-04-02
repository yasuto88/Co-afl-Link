import { User } from "@/interface/types";
import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../co-afl-app-firebase-adminsdk-8duq1-b85223fa56.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "users";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();

  if (req.method === "GET") {
    // Firestoreからユーザーデータを取得
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const users = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("success to fetch user data");
    // 成功レスポンスとしてユーザーデータを返す
    res.status(200).json(users);
  } else {
    // 未サポートのHTTPメソッドの場合
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
