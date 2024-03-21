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
  cardOrder: number;
}
export interface updateCardBody {
  title: string;
  description: string;
  id: string;
}
export interface updateCardWorkStatusBody {
  id: string;
  workStatus: string;
}
export interface updateCardOrderBody {
  id: string;
  cardOrder: number;
}
