import axios from 'axios';
import { FeedbackMessage } from '@/interface/types'; // FeedbackMessage 型のインポート

/**
 * フィードバックメッセージをサーバーにPOSTする関数
 * @param feedbackMessage FeedbackMessage型のデータ
 */
async function postFeedback(feedbackMessage: FeedbackMessage) {
  try {
    // axiosを使用してPOSTリクエストを送信
    const response = await axios.post('/api/postFeedback', feedbackMessage);
    if (response.status === 201) {
      console.log('Feedback submitted successfully:', response.data);
      return response.data; // 成功した場合はレスポンスデータを返す
    } else {
      throw new Error(`Failed to submit feedback: ${response.status}`);
    }
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting feedback:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // エラーを上位の呼び出し元に伝播させる
  }
}

export default postFeedback;
