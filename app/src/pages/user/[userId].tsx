// pages/user.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
// import ProfileTop from "@/components/Profile/ProfileTop";
import MyProfile from "@/components/Profile/MyProfile";
import { User } from "@/interface/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { AspectRatio, Card, CardContent, Skeleton, Typography } from "@mui/joy";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = React.useState<User | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId === undefined) return;
        const res = await fetch(`/api/user/${userId}`);
        const data: User = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userData === null) fetchUserData();
  }, [userId]);
  const user = {
    id: "1",
    name: "山田太郎",
    name_kana: "やまだたろう",
    contact_info: "example@gmail.com",
    university_name: "東京大学",
    faculty: "情報学部",
    department: "情報学科",
    role: "学生",
    introduction: "こんにちは！",
    portfolio_url: ["https://example.com"],
    // ランダムな値を設定
    group_id: "104d1bcb",
    feedback_message_ids: ["1", "2"],
    activity_ids: ["1", "2"],
    slack_id: "1",
    slack_name: "yamada",
  };

  return <MyProfile user={userData} />;
};

export default UserPage;
