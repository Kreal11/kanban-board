import { Card } from "../board/types";

export interface CardState {
  card: Card;
  isLoading: boolean;
  error: string | null;
}

export interface deleteCardBody {
  id: string;
}
