import { SubmitHandler, useForm } from "react-hook-form";
import { AddForm, FormWrapper } from "./AddBoardForm.styled";
import { useAppDispatch } from "../../redux/hooks";
import { addBoardThunk } from "../../redux/board/operations";
import { FC } from "react";

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
    dispatch(addBoardThunk({ title, theme }));
    reset();
    closeModal();
  };

  return (
    <FormWrapper>
      <h3>Add info for new board!</h3>
      <AddForm onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder="Enter title" {...register("title")} />
        <input type="text" placeholder="Enter theme" {...register("theme")} />
        <button>Submit</button>
      </AddForm>
    </FormWrapper>
  );
};

export default AddBoardForm;
