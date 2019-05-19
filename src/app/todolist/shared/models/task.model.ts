export interface Task {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  tagColor: string;
  ownerLetter: string;
  isDone?: boolean;
  date?: Date;
  id?: string;
}
