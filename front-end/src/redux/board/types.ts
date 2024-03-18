export interface Card {
  _id: string;
  title: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  _id: string | undefined;
  title: string | undefined;
  theme: string | undefined;
  cards: [Card] | [];
}

export interface BoardsState {
  boards?: [Board] | [];
  board: Board;
  isLoading: boolean;
  error: Error | null;
}
