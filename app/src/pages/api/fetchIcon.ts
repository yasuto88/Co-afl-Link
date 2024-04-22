import { User } from "@/interface/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      "https://slack.com/api/users.profile.get",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_USER_TOKEN}`,
        },
        params: { user: "U06RYP2Q0H4" },
      }
    );
    if (response.data.ok) {
      res.status(200).json({ icon: response.data.profile.image_192 });
    } else {
      res.status(400).json({ error: response.data.error });
    }
  } catch (e) {
    res.status(500).json({ error: "error" });
  }
}
