import { useModal } from "../../hooks/useModal";
import { ButtonsWrapper } from "../boardItem/BoardItem.styled";
import { CardInfoWrapper, CardLi } from "./CardItem.styled";
import sprite from "../../assets/icons/plus.svg";

interface CardItemProps {
  _id: string;
  title: string;
  description: string;
}

const CardItem = ({ title, description, _id }: CardItemProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  //   const;

  return (
    <CardLi>
      <CardInfoWrapper>
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
