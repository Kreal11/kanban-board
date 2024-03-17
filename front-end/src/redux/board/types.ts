interface Board {
  _id: string;
  title: string;
  theme: string;
}

export interface BoardsState {
  boards?: [Board] | [];
  isLoading: boolean;
  error: Error | null;
}
