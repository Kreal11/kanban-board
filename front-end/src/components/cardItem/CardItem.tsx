import { ButtonsWrapper } from "../boardItem/BoardItem.styled";
import { CardInfoWrapper, CardLi } from "./CardItem.styled";
import sprite from "../../assets/icons/plus.svg";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCardThunk } from "../../redux/card/operations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/Modal";
import UpdateCardForm from "../updateCardForm/UpdateCardForm";

interface CardItemProps {
  _id: string;
  title: string;
  description: string;
}

const CardItem = ({ title, description, _id }: CardItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const handleGetCard = (id: string) => {
    navigate(`/cards/${id}`);
  };

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCardThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Card was deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CardLi>
        <CardInfoWrapper onClick={() => handleGetCard(_id)}>
          <h3>{title}</h3>
          <p>{description}</p>
        </CardInfoWrapper>
        <ButtonsWrapper>
          <button onClick={openModal}>
            <svg>
              <use xlinkHref={`${sprite}#icon-edit`} />
            </svg>
          </button>
          <button onClick={() => handleDeleteCard(_id)}>
            <svg>
              <use xlinkHref={`${sprite}#icon-delete`} />
            </svg>
          </button>
        </ButtonsWrapper>
      </CardLi>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <UpdateCardForm
            closeModal={closeModal}
            id={_id}
            title={title}
            description={description}
          />
        </Modal>
      )}
    </>
  );
};

export default CardItem;
