export interface BookDetailsResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  coverPath: string;
  filePath: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  authorName: string;
}
