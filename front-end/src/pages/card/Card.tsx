import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCardByIdThunk } from "../../redux/card/operations";
import { toast } from "react-toastify";
import { selectGetCard } from "../../redux/card/selectors";
import { CardPageInfoWrapper } from "./Card.styled";

const Card = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { title, description } = useAppSelector(selectGetCard);

  useEffect(() => {
    dispatch(getCardByIdThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Card was loaded successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <CardPageInfoWrapper>
      <button onClick={handleGoBack}>↩ Back</button>
      <h3>{title}</h3>
      <p>Description: {description}</p>
    </CardPageInfoWrapper>
  );
};

export default Card;
