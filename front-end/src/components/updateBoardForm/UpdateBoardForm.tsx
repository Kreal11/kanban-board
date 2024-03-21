import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { updateBoardThunk } from "../../redux/board/operations";
import { FC } from "react";
import { FormWrapper, UpdateForm } from "./UpdateBoardForm.styled";
import { toast } from "react-toastify";

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
    if (!title || !theme) {
      return toast.warning("Fields are required! Fill out it, please");
    }

    if (title.trim() === "" || theme.trim() === "") {
      toast.warning("Please fill out all fields");
      return;
    }

    dispatch(updateBoardThunk({ title, theme, id }))
      .unwrap()
      .then(() => {
        toast.success("Board was updated successfully!");
        reset();
        closeModal();
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
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
