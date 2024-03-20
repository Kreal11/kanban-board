export interface Card {
  _id: string;
  title: string;
  description: string;
  owner: string;
  workStatus: string;
  cardOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Board {
  _id: string;
  title: string;
  theme: string;
  cards: Card[] | [];
  createdAt: string;
  updatedAt: string;
}

export interface BoardsState {
  boards: Board[] | [];
  board: Board;
  isLoading: boolean;
  error: string | null;
}

export interface AddBoardBody {
  title: string;
  theme: string;
}

export interface UpdateBoardBody {
  title: string;
  theme: string;
  id: string;
}
