import { NextApiRequest, NextApiResponse } from "next";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";
import admin from "firebase-admin";

const serviceAccount = require("../../../co-afl-app-firebase-adminsdk-8duq1-b85223fa56.json"); // 秘密鍵を取得

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "Users";
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();

  if (req.method === "POST") {
    try {
      // ローカルファイルのパスを指定
      const filePath = path.resolve("./public", "User.json");
      const jsonData = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(jsonData).Users;

      // Usersオブジェクト内の各ユーザーをFirestoreに保存
      const promises = Object.keys(data).map((userId) => {
        const userDoc = db.collection(COLLECTION_NAME).doc(userId);
        return userDoc.set(data[userId]);
      });

      // すべての保存処理を待つ
      await Promise.all(promises);

      res.status(200).json({ message: "Data exported successfully." });
    } catch (error) {
      console.error("Error exporting data to Firestore:", error);
      res.status(500).json({ error: "Failed to export data to Firestore." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
