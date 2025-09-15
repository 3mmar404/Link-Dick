export type Status = 'unread' | 'important' | 'reviewed';

export interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  image: string;
  platform: string;
  tags: string[];
  createdAt: string;
  status: Status;
}

export interface LinkMetadata {
  title: string;
  description: string;
  image: string;
}

export interface Tag {
  name: string;
  count: number;
}