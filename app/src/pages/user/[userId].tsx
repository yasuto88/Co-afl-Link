// pages/user.tsx
import React, { use } from "react";
import { useRouter } from "next/router";
// import ProfileTop from "@/components/Profile/ProfileTop";
import MyProfile from "@/components/Profile/MyProfile";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query; // URLからユーザーIDを取得

  // 仮のユーザーデータ
  const userData = {
    id: "participant_001",
    name: "山田太郎",
    contact_info: "yamada@example.com",
    university_name: "東京大学",
    role: "学生",
    introduction: "ビジネスとテクノロジーの融合に興味があります。",
    portfolio_url: "http://yamada-portfolio.example.com",
    qr_code: "http://qr.example.com/participant_001",
    group_id: "group_001",
    likes: 5,
    feedback_messages: [
      {
        from: "judge_001",
        message: "非常に革新的なアイデアです！",
        timestamp: "2024-03-10T10:00:00Z",
      },
    ],
    check_in_status: {
      event_id: "event_001",
      checked_in: true,
      check_in_time: null,
    },
  };

  return (
    // <ProfileTop
    //   name={userData.name}
    //   university={userData.university_name}
    //   qrCodeUrl={userData.qr_code}
    //   contact_info={userData.contact_info}
    //   group_id={userData.group_id}
    // />
    <MyProfile />
  );
};

export default UserPage;
