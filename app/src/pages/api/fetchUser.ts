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
    try {
      const snapshot = await db.collection(COLLECTION_NAME).get();
      const users: User[] = snapshot.docs.map((doc: any) => {
        const userData = doc.data() as Partial<User>;
        return {
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
          slack_id: userData.slack_id ?? "",
          slack_email: userData.slack_email ?? "",
          slack_icon_url: undefined, // 初期値として undefined を設定
        };
      });

      const fetchIcons = users.map(async (user) => {
        if (user.slack_id) {
          const response = await axios.get(
            "https://slack.com/api/users.profile.get",
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_USER_TOKEN}`,
              },
              params: { user: user.slack_id },
            }
          );
          if (response.data.ok) {
            console.log("Icon fetched:", response.data.profile.image_192);
            user.slack_icon_url = response.data.profile.image_192;
          } else {
            console.error("Error fetching icon:", response.data.error);
          }
        }
      });

      await Promise.all(fetchIcons);
      console.log("All icons fetched");
      res.status(200).json(users);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
