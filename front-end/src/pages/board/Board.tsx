import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoardById } from "../../redux/board/selectors";
import { toast } from "react-toastify";
import {
  BoardWrapper,
  CardList,
  CardListWrapper,
  CardListsWrapper,
  CardPlusSvg,
  HomeButton,
} from "./Board.styled";
import CardItem from "../../components/cardItem/CardItem";
import sprite from "../../assets/icons/plus.svg";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cards } = useSelector(selectGetBoardById);

  useEffect(() => {
    dispatch(getBoardByIdThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Board info was loaded successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
  }, [dispatch, id]);

  const handleGoHome = () => {
    navigate("/");
  };

  const toDoCards = cards?.filter((card) => card.status === "toDo");
  const inProgressCards = cards?.filter((card) => card.status === "inProgress");
  const doneCards = cards?.filter((card) => card.status === "done");

  return (
    <BoardWrapper>
      <HomeButton onClick={handleGoHome}>↩ Home</HomeButton>

      <CardListsWrapper>
        <CardListWrapper>
          <h2>To Do</h2>
          <CardList>
            <CardPlusSvg>
              <use xlinkHref={`${sprite}#icon-plus`} />
            </CardPlusSvg>

            {toDoCards?.map((card) => (
              <CardItem key={card._id} {...card} />
            ))}
          </CardList>
        </CardListWrapper>

        <CardListWrapper>
          <h2>In Progress</h2>
          <CardList>
            {inProgressCards?.map((card) => (
              <CardItem key={card._id} {...card} />
            ))}
          </CardList>
        </CardListWrapper>

        <CardListWrapper>
          <h2>Done</h2>
          <CardList>
            {doneCards?.map((card) => (
              <CardItem key={card._id} {...card} />
            ))}
          </CardList>
        </CardListWrapper>
      </CardListsWrapper>
    </BoardWrapper>
  );
};

export default Board;
