import type { NextApiRequest, NextApiResponse } from "next";
import { FeedbackMessage } from "@/interface/types"; // FeedbackMessage 型のインポートが必要です
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../co-afl-app-firebase-adminsdk-8duq1-b85223fa56.json");
const admin = require("firebase-admin");

// Firebase Admin SDK の初期化
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert(serviceAccount),
  });
}
const db = getFirestore();

// APIハンドラー関数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "feedbacks"; // フィードバックメッセージを保存するコレクション名

  if (req.method === "POST") {
    try {
      const feedbackMessage: FeedbackMessage = req.body; // req.bodyからFeedbackMessage型としてデータを取得
      // 新しいドキュメントを作成し、データを保存
      const docRef = await db.collection(COLLECTION_NAME).add({
        userId: feedbackMessage.userId,
        name: feedbackMessage.name,
        title: feedbackMessage.title,
        type: feedbackMessage.type,
        message: feedbackMessage.message,
        timestamp: new Date().toISOString(),
      }) ;
      console.log("Feedback message posted:", docRef.id);
      res
        .status(201)
        .json({ message: "Feedback posted successfully", id: docRef.id });
    } catch (error) {
      console.error("Failed to post feedback:", error);
      res.status(500).json({ error: "Failed to post feedback" });
    }
  } else {
    // POSTメソッド以外は許可しない
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
