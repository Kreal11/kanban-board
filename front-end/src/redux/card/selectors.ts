import { RootState } from "../store";

export const selectGetCard = (state: RootState) => state.cards.card;
