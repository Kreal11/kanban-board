import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoardById } from "../../redux/board/selectors";
import { toast } from "react-toastify";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { _id, title, theme, cards } = useSelector(selectGetBoardById);

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

  return (
    <div>
      <button onClick={handleGoHome}>↩ Home</button>

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
    </div>
  );
};

export default Board;
