export interface Post {
  id: string; // ou number, dependendo da sua API
  title: string;
  content: string;
  authorName: string;
  createdAt: string; // A API geralmente envia datas como strings no formato ISO
}
