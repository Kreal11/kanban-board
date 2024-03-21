import { SubmitHandler, useForm } from "react-hook-form";
import { AddForm, FormWrapper } from "./AddBoardForm.styled";
import { useAppDispatch } from "../../redux/hooks";
import { addBoardThunk } from "../../redux/board/operations";
import { FC } from "react";
import { toast } from "react-toastify";

interface Inputs {
  title: string;
  theme: string;
}

interface AddBoardFormProps {
  closeModal: () => void;
}

const AddBoardForm: FC<AddBoardFormProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const submit: SubmitHandler<Inputs> = ({ title, theme }) => {
    if (title.trim() === "" || theme.trim() === "") {
      toast.warning("Please fill out all fields");
      return;
    }

    dispatch(addBoardThunk({ title, theme }))
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
      <h3>Add info for new board!</h3>
      <AddForm onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
        <input
          type="text"
          placeholder="Enter theme"
          {...register("theme", { required: true })}
        />
        <button>Submit</button>
      </AddForm>
    </FormWrapper>
  );
};

export default AddBoardForm;
