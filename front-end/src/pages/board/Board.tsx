import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoardById } from "../../redux/board/selectors";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { _id, title, theme, cards } = useSelector(selectGetBoardById);

  useEffect(() => {
    dispatch(getBoardByIdThunk(id));
  }, [dispatch, id]);

  return (
    <div>
      <p>{_id}</p>
      <p>{title}</p>
      <p>{theme}</p>
      <ul>
        {cards?.map((card) => (
          <li key={card._id}>
            <p>{card._id}</p>
            <p>{card.title}</p>
            <p>{card.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
