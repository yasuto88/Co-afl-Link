// ユーザーに関する情報
export interface User {
  id: string;
  name: string;
  name_kana: string;
  contact_info: string;
  university_name: string;
  faculty?: string;
  department?: string;
  role?: string;
  introduction?: string;
  portfolio_url?: string[];
  group_id?: string;
  feedback_message_ids?: string[];
  activity_ids: string[];
  slack_id: string;
  slack_email?: string;
  slack_icon_url?: string;
}

// フィードバックメッセージに関する情報
export interface FeedbackMessage {
  id: string;
  userId: string;
  name?: string;
  title: string;
  type: "good" | "hint" | "bad";
  message: string;
  timestamp: string;
}

// チェックインステータスに関する情報
export interface CheckInStatus {
  id: string;
  checked_in: boolean;
  check_in_time: null | string;
}

// チャットメッセージに関する情報
export type Message = {
  id: string;
  user_id: string;
  content: string;
  timestamp: string;
  // attachmentを配列に変更
  
  attachment?: [{
    fileName: string;
    type: string;
    size: string;
  }];
};

// ファイルに関する情報
export type File = {
  id: string;
  name: string;
  size: string;
  type: string;
};

// タスクに関する情報
// export type Task = {
//   id: string;
//   time: string;
//   description: string;
// };

// アクティビティに関する情報
export type Activity = {
  user_id: string;
  time: string;
  description: string;
};

// チームに関する情報
export type Team = {
  id: string;
  slack_channel_id: string;
  name: string;
  member_ids: string[];
  message_ids: string[];
  file_ids: string[];
};

// data.jsonから取得したデータ全体の型定義
export interface Data {
  users: User[];
  teams: Team[];
  feedbackMessages: FeedbackMessage[];
  checkInStatuses: CheckInStatus[];
  messages: Message[];
  files: File[];
  activities: Activity[];
}
