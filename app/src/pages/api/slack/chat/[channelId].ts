import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Message } from "@/interface/types"; // Message型のインポートを確認

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

      const formatTimestamp = (timestamp: string) => {
        const date = new Date(parseFloat(timestamp) * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      };

      // contentを加工
      const formatContent = (content: string) => {
        // メンションを削除 例：<!channel> -> "" もしくは<@U06TYNPTQ6S>　-> ""
        // const mentionRemoved = content.replace(/<!.*?>/g, "");
        let mentionRemoved = content.replace(/<@.*?>/g, "");
        mentionRemoved = mentionRemoved.replace(/<!.*?>/g, "");
        
        // 例:white_check_mark: -> ""
        mentionRemoved = mentionRemoved.replace(/:\w+:/g, "");
        // URLから<>を削除
        const urlCleaned = mentionRemoved.replace(/<(.+?)>/g, "$1");
        return urlCleaned;
      };

      // sizeを加工
      const formatSize = (size: number) => {
        if (size < 1024) {
          return `${size}B`;
        } else if (size < 1024 * 1024) {
          return `${(size / 1024).toFixed(1)}KB`;
        } else {
          return `${(size / 1024 / 1024).toFixed(1)}MB`;
        }
      };

      // typeを加工
      const formatType = (type: string) => {
        // 例：image/jpeg -> jpeg
        return type.split("/")[1];
    }

      // subtypeがないメッセージのみをフィルタし、Messageインターフェースに合わせてデータを整形
      const filteredMessages: Message[] = messages
        .filter((msg: any) => !msg.subtype)
        .map((msg: any) => ({
          id: msg.client_msg_id || msg.ts,
          user_id: msg.user,
          content: formatContent(msg.text),
          timestamp: formatTimestamp(msg.ts),
          attachment: msg.files
            ? msg.files.map(
                (file: {
                  name: any;
                  mimetype: any;
                  size: number;
                }) => ({
                  // 添付ファイルが存在する場合、それを配列にマップ
                  fileName: file.name,
                  type: formatType(file.mimetype),
                  size: formatSize(file.size),
                })
              )
            : undefined,
        }));
        
      // 変換されたMessageデータをレスポンスとして返す
      res.status(200).json(filteredMessages);
    } catch (error) {
      console.error("Error fetching from Slack:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
