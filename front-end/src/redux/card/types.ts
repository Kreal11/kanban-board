import { Card } from "../board/types";

export interface CardState {
  cards: Card[];
  card: Card;
  isLoading: boolean;
  error: string | null;
}

export interface deleteCardBody {
  id: string;
}
