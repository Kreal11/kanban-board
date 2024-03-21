import { useNavigate } from "react-router";
import { BoardInfoWrapper, BoardLi, ButtonsWrapper } from "./BoardItem.styled";
import { useAppDispatch } from "../../redux/hooks";
import { deleteBoardThunk } from "../../redux/board/operations";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/Modal";
import UpdateBoardForm from "../updateBoardForm/UpdateBoardForm";
import { toast } from "react-toastify";
import editImg from "../../assets/images/edit.png";
import deleteImg from "../../assets/images/delete.png";

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
    dispatch(deleteBoardThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Board was deleted successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
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
            <img src={editImg} alt="Edit mark" />
          </button>
          <button onClick={() => hanldeDeleteBoard(_id)}>
            <img src={deleteImg} alt="Delete bin" />
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
