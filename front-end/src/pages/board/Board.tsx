import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";

const Board = () => {
  const boards = useSelector(selectGetBoards);
  const { _id, title, theme } = boards[0];
  console.log(boards);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardByIdThunk(id));
  }, [dispatch, id]);

  return (
    <div>
      <p>{_id}</p>
      <p>{title}</p>
      <p>{theme}</p>
    </div>
  );
};

export default Board;
