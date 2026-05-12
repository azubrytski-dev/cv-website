export interface Post {
  topic: string;
  tags: string[];
  content: string;
}

export type BlogPostStatus = 'published' | 'planned';

export interface BlogPost extends Post {
  slug: string;
  title: string;
  categoryKey: string;
  category: string;
  skill: string;
  status: BlogPostStatus;
  summary: string;
  filePath: string;
}

