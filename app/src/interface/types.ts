// ユーザーに関する情報
export interface User {
  id: string;
  name: string;
  name_kana: string;
  contact_info: string;
  university_name: string;
  role: string;
  introduction: string;
  portfolio_url: string[];
  group_id: string;
  feedback_messages: FeedbackMessage[];
  check_in_status: CheckInStatus;
}

// フィードバックメッセージに関する情報
export interface FeedbackMessage {
  name: string;
  title: string;
  type: string;
  message: string;
  timestamp: string;
}

// チェックインステータスに関する情報
export interface CheckInStatus {
  checked_in: boolean;
  check_in_time: null | string;
}

// チャットメッセージに関する情報
export type MessageProps = {
  id: string;
  content: string;
  timestamp: string;
  sender: User | "You";
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

// ファイルに関する情報
export type FileProps = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
};

// タスクに関する情報
export type Task = {
  time: string;
  description: string;
};

// アクティビティに関する情報
export type Activity = {
  user: User;
  taskData: Task[];
};

// チームに関する情報
export type Teams = {
  id: string;
  name: string;
  members: User[];
  activities: Activity[];
  messages: MessageProps[];
  files: FileProps[];
};

// data.jsonから取得したデータ全体の型定義
export interface Data {
  user: User[];
  team: Teams[];
}
