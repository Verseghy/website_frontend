export interface Post {
  id: number;
  author: string;
  authorImage: string;
  date: Date;
  dateAgo: string;
  description: string;
  image: string;
  post: string;
  title: string;
  backgroundColor: string;
  isDark: boolean;
  type: number;
  labels: {
    title: string;
    backgroundColor: string;
    isDark: boolean;

  };
}
