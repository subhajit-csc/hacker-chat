export interface Message {
  text: string;
  id: number;
  userId: number;
  timestamp: Date;
  userName?: string;
}
