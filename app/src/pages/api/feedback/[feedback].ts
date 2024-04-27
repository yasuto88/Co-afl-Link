import { FeedbackMessage } from "@/interface/types";
import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

// Firebase Admin SDK の初期化
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "feedbacks";
  const userId = req.query.feedback as string;

  if (req.method === "GET") {
    try {
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      // feedbacks コレクションから userId が指定されたユーザーIDに一致するドキュメントを検索
      const querySnapshot = await db
        .collection(COLLECTION_NAME)
        .where("userId", "==", userId)
        .get();

      if (querySnapshot.empty) {
        return res
          .status(404)
          .json({ error: "No feedback found for this user" });
      }

      const feedbacks: FeedbackMessage[] = querySnapshot.docs.map(
        (doc: any) => ({
          id: doc.id,
          userId: doc.data().userId ?? "",
          name: doc.data().name ?? "",
          title: doc.data().title ?? "",
          type: doc.data().type ?? "",
          message: doc.data().message ?? "",
          timestamp: doc.data().timestamp ?? "",
        })
      );

      console.log("Success to fetch feedbacks for user:", feedbacks.length);
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
