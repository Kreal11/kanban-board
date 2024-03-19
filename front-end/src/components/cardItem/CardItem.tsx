import { ButtonsWrapper } from "../boardItem/BoardItem.styled";
import { CardInfoWrapper, CardLi } from "./CardItem.styled";
import sprite from "../../assets/icons/plus.svg";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCardThunk } from "../../redux/card/operations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface CardItemProps {
  _id: string;
  title: string;
  description: string;
}

const CardItem = ({ title, description, _id }: CardItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGetCard = (id: string) => {
    navigate(`/cards/${id}`);
  };

  const handleDeleteCard = (id: string) => {
    console.log(id);
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
    <CardLi>
      <CardInfoWrapper onClick={() => handleGetCard(_id)}>
        <h3>{title}</h3>
        <p>{description}</p>
      </CardInfoWrapper>
      <ButtonsWrapper>
        <button>
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
  );
};

export default CardItem;
