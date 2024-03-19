import { RootState } from "../store";

export const selectGetCard = (state: RootState) => state.cards.card;
export const selectAllCards = (state: RootState) => state.cards.cards;
