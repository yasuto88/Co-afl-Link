export interface Participant {
    id: string;
    name: string;
    contact_info: string;
    university_name: string;
    role: string;
    introduction: string;
    portfolio_url: string;
    qr_code: string;
    group_id: string;
    likes: number;
    feedback_messages: FeedbackMessage[];
    check_in_status: CheckInStatus;
  }
  
  export interface FeedbackMessage {
    from: string;
    message: string;
    timestamp: string;
  }
  
  export interface CheckInStatus {
    event_id: string;
    checked_in: boolean;
    check_in_time: null | string;
  }
  
  // data.jsonから取得したデータ全体の型定義
  export interface Data {
    participants: Participant[];
    events: any[]; // ここでは簡略化のために any 型を使用
  }