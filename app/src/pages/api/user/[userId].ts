import { User } from "@/interface/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "test";
  // 初期化する
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
  const userId = req.query.userId as string;

  if (req.method === "GET") {
    try {
      if (userId) {
        const docRef = db.collection(COLLECTION_NAME).doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) {
          return res.status(404).json({ error: "User not found" });
        }

        const userData = doc.data() as User;
        const userResponse: User = {
          id: doc.id,
          name: userData.name ?? "",
          name_kana: userData.name_kana ?? "",
          contact_info: userData.contact_info ?? "",
          university_name: userData.university_name ?? "",
          faculty: userData.faculty ?? "",
          department: userData.department ?? "",
          role: userData.role ?? "",
          introduction: userData.introduction ?? "",
          portfolio_url: userData.portfolio_url ?? [],
          group_id: userData.group_id ?? "",
          feedback_message_ids: userData.feedback_message_ids ?? [],
          activity_ids: userData.activity_ids ?? [],
          slack_email: userData.slack_email ?? "",
          slack_id: userData.slack_id ?? "",
          slack_icon_url: undefined,
        };

        if (userResponse.slack_id) {
          const response = await axios.get(
            "https://slack.com/api/users.profile.get",
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_USER_TOKEN}`,
              },
              params: { user: userResponse.slack_id },
            }
          );
          if (response.data.ok) {
            userResponse.slack_icon_url = response.data.profile.image_192;
          }
        }
        console.log("Success to fetch user data for:", userResponse.id);
        res.status(200).json(userResponse);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
