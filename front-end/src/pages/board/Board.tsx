import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoardById } from "../../redux/board/selectors";
import { toast } from "react-toastify";
import {
  BoardWrapper,
  CardListWrapper,
  CardListsWrapper,
  HomeButton,
} from "./Board.styled";

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
          <ul>
            {toDoCards?.map((card) => (
              <li key={card._id}>
                <p>{card.title}</p>
                <p>{card.description}</p>
                <p>{card._id}</p>
              </li>
            ))}
          </ul>
        </CardListWrapper>

        <CardListWrapper>
          <h2>In Progress</h2>
          <ul>
            {inProgressCards?.map((card) => (
              <li key={card._id}>
                <p>{card.title}</p>
                <p>{card.description}</p>
                <p>{card._id}</p>
              </li>
            ))}
          </ul>
        </CardListWrapper>

        <CardListWrapper>
          <h2>Done</h2>
          <ul>
            {doneCards?.map((card) => (
              <li key={card._id}>
                <p>{card.title}</p>
                <p>{card.description}</p>
                <p>{card._id}</p>
              </li>
            ))}
          </ul>
        </CardListWrapper>
      </CardListsWrapper>
    </BoardWrapper>
  );
};

export default Board;
