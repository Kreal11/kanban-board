interface Board {
  _id: string | undefined;
  title: string | undefined;
  theme: string | undefined;
}

export interface BoardsState {
  boards?: [Board] | [];
  isLoading: boolean;
  error: Error | null;
}
