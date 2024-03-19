import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { FC } from "react";
import { toast } from "react-toastify";
import { addCardThunk } from "../../redux/card/operations";
import { useParams } from "react-router";
import { AddForm, FormWrapper } from "../addBoardFrom/AddBoardForm.styled";

interface Inputs {
  title: string;
  description: string;
}

interface AddCardFormProps {
  closeModal: () => void;
}

const AddCardForm: FC<AddCardFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const workStatus = "toDo";

  const submit: SubmitHandler<Inputs> = ({ title, description }) => {
    console.log(title, description);
    dispatch(addCardThunk({ title, description, owner: id, workStatus }))
      .unwrap()
      .then(() => {
        toast.success("New board was added successfully!");
        reset();
        closeModal();
      })
      .catch(() => {
        toast.warning(
          "Oops, something went wrong! Maybe, board with this title already exists. Try to change it! Otherwise try again, please!"
        );
      });
  };

  return (
    <FormWrapper>
      <h3>Add info for new card!</h3>
      <AddForm onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
        <textarea
          placeholder="Add description for your card"
          {...register("description", { required: true })}
        ></textarea>
        <button>Submit</button>
      </AddForm>
    </FormWrapper>
  );
};

export default AddCardForm;
