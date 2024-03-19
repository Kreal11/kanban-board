import { Card } from "../board/types";

export interface CardState {
  card: Card;
  isLoading: boolean;
  error: string | null;
}

export interface addCardBody {
  title: string;
  description: string;
  owner: string | undefined;
  workStatus: string;
}
