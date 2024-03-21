import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { FC } from "react";
import { toast } from "react-toastify";
import { updateCardThunk } from "../../redux/card/operations";
import {
  FormWrapper,
  UpdateForm,
} from "../updateBoardForm/UpdateBoardForm.styled";

interface Inputs {
  title: string;
  description: string;
}

interface UpdateCardFormProps {
  closeModal: () => void;
  id: string;
  title: string;
  description: string;
}

const UpdateCardForm: FC<UpdateCardFormProps> = ({
  closeModal,
  id,
  title,
  description,
}) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      title,
      description,
    },
  });

  const submit: SubmitHandler<Inputs> = ({ title, description }) => {
    if (!title || !description) {
      return toast.warning("Fields are required! Fill out it, please");
    }

    if (title.trim() === "" || description.trim() === "") {
      toast.warning("Please fill out all fields");
      return;
    }

    dispatch(updateCardThunk({ title, description, id }))
      .unwrap()
      .then(() => {
        toast.success("Card was updated successfully!");
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
        <input
          type="text"
          placeholder="Enter new title"
          {...register("title")}
        />
        <textarea
          placeholder="Enter new description"
          {...register("description")}
        ></textarea>
        <button>Submit</button>
      </UpdateForm>
    </FormWrapper>
  );
};

export default UpdateCardForm;
