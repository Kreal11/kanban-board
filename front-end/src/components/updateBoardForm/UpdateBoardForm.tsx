import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { updateBoardThunk } from "../../redux/board/operations";
import { FC } from "react";
import { FormWrapper, UpdateForm } from "./UpdateBoardForm.styled";

interface Inputs {
  title: string;
  theme: string;
}

interface UpdateBoardFormProps {
  closeModal: () => void;
  id: string;
  title: string;
  theme: string;
}

const UpdateBoardForm: FC<UpdateBoardFormProps> = ({
  closeModal,
  id,
  title,
  theme,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title,
      theme,
    },
  });

  const submit: SubmitHandler<Inputs> = ({ title, theme }) => {
    dispatch(updateBoardThunk({ title, theme, id }));
    reset();
    closeModal();
  };

  return (
    <FormWrapper>
      <h3>Update info of your board!</h3>
      <UpdateForm onSubmit={handleSubmit(submit)}>
        <input type="text" placeholder="Enter title" {...register("title")} />
        <input type="text" placeholder="Enter theme" {...register("theme")} />
        <button>Submit</button>
      </UpdateForm>
    </FormWrapper>
  );
};

export default UpdateBoardForm;
