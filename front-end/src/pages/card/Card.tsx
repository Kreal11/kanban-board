import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCardByIdThunk } from "../../redux/card/operations";
import { toast } from "react-toastify";
import { selectGetCard } from "../../redux/card/selectors";

const Card = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
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

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
