import { useModal } from "../../hooks/useModal";
import { ButtonsWrapper } from "../boardItem/BoardItem.styled";
import { CardInfoWrapper, CardLi } from "./CardItem.styled";
import sprite from "../../assets/icons/plus.svg";
import { useAppDispatch } from "../../redux/hooks";
import { getCardByIdThunk } from "../../redux/card/operations";
import { toast } from "react-toastify";

interface CardItemProps {
  _id: string;
  title: string;
  description: string;
}

const CardItem = ({ title, description, _id }: CardItemProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, openModal, closeModal } = useModal();

  const handleGetCard = (id: string) => {
    dispatch(getCardByIdThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Card was loaded successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
  };

  return (
    <CardLi>
      <CardInfoWrapper onClick={() => handleGetCard(_id)}>
        <h3>{title}</h3>
        <p>Description: {description}</p>
      </CardInfoWrapper>
      <ButtonsWrapper>
        <button onClick={openModal}>
          <svg>
            <use xlinkHref={`${sprite}#icon-edit`} />
          </svg>
        </button>
        <button>
          <svg>
            <use xlinkHref={`${sprite}#icon-delete`} />
          </svg>
        </button>
      </ButtonsWrapper>
    </CardLi>
  );
};

export default CardItem;
