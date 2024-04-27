import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Activity } from "@/interface/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Slackのチャンネルからメッセージを取得
      const fetchMessages = await axios.get(
        `https://slack.com/api/conversations.history`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_USER_TOKEN}`,
          },
          params: {
            channel: req.query.channelId as string,
          },
        }
      );

      if (!fetchMessages.data.ok) {
        throw new Error(fetchMessages.data.error);
      }

      const messages = fetchMessages.data.messages;
      const greenCheckMessages = messages.filter(
        (message: { text: string }) =>
          message.text && message.text.startsWith(":white_check_mark:")
      );

      const formatTimestamp = (timestamp: string) => {
        const date = new Date(parseFloat(timestamp) * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`;
      };

      // Activity型にデータを変換
      const activities: Activity = greenCheckMessages.map(
        (message: { user: any; ts: string; text: any }) => ({
          user_id: message.user,
          time: formatTimestamp(message.ts),
          description: message.text.replace(":white_check_mark:", "").trim(), // チェックマークを削除してトリム
        })
      );

      // 変換されたActivityデータをレスポンスとして返す
      console.log("Slack messages fetched:");
      res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching from Slack:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
