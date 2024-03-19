import { useNavigate } from "react-router";
import sprite from "../../assets/icons/plus.svg";
import { BoardInfoWrapper, BoardLi, ButtonsWrapper } from "./BoardItem.styled";
import { useAppDispatch } from "../../redux/hooks";
import { deleteBoardThunk } from "../../redux/board/operations";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/Modal";
import UpdateBoardForm from "../updateBoardForm/UpdateBoardForm";

interface BoardItemProps {
  title: string;
  theme: string;
  _id: string;
}

const BoardItem = ({ title, theme, _id }: BoardItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isOpen, openModal, closeModal } = useModal();

  const handleGetBoardById = () => {
    navigate(`boards/${_id}`);
  };

  const hanldeDeleteBoard = (id: string) => {
    dispatch(deleteBoardThunk(id));
  };

  return (
    <>
      <BoardLi>
        <BoardInfoWrapper>
          <div onClick={handleGetBoardById}>
            <h2>{title}</h2>
            <p>{theme}</p>
          </div>
          <p>{_id}</p>
        </BoardInfoWrapper>
        <ButtonsWrapper>
          <button onClick={openModal}>
            <svg>
              <use xlinkHref={`${sprite}#icon-edit`} />
            </svg>
          </button>
          <button onClick={() => hanldeDeleteBoard(_id)}>
            <svg>
              <use xlinkHref={`${sprite}#icon-delete`} />
            </svg>
          </button>
        </ButtonsWrapper>
      </BoardLi>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <UpdateBoardForm
            closeModal={closeModal}
            id={_id}
            title={title}
            theme={theme}
          />
        </Modal>
      )}
    </>
  );
};

export default BoardItem;
