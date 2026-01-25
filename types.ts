
export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar?: string;
  bio?: string;
  department?: string;
  year?: string;
  phone?: string;
  isRepresentative?: boolean;
}

export interface Peer {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  tags: string[];
}

export interface StudyGroup {
  id: string;
  title: string;
  description: string;
  membersCount: number;
  subject: string;
  isLive: boolean;
  scheduledTime?: Date;
  hostId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface P2PMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export type NotificationType = 'message' | 'invite' | 'follow';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

export interface Resource {
  id: string;
  title: string;
  department: string;
  year: string;
  type: 'PDF' | 'Notes' | 'PYQ' | 'Lab';
  size: string;
  downloads: number;
  author: string;
}

export interface SyllabusItem {
  id: string;
  subject: string;
  topics: string[];
  department: string;
  year: string;
  semester: string;
}

export type EventType = 'Academic' | 'Cultural' | 'Technical' | 'Sports' | 'Holiday';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  eventType: EventType;
  createdBy: string;
  createdAt: Date;
}

export type AppTab = 'home' | 'peers' | 'groups' | 'ai-tutor' | 'resources' | 'campus-hub' | 'syllabus-tracker' | 'aot-calendar';
