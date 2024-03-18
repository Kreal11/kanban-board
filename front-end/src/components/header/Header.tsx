import { SubmitHandler, useForm } from "react-hook-form";
import { Button, HeaderForm, HeaderWrapper, Input } from "./Header.styled";
import { useNavigate } from "react-router";

type Input = {
  id: string;
};

const Header = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<Input>();

  const submit: SubmitHandler<Input> = (data): void => {
    reset();
    navigate(`boards/${data.id}`);
  };

  return (
    <HeaderWrapper>
      <HeaderForm onSubmit={handleSubmit(submit)}>
        <Input
          type="text"
          placeholder="Enter board`s ID to find it"
          {...register("id", { required: true })}
        />
        <Button>Load</Button>
      </HeaderForm>
    </HeaderWrapper>
  );
};

export default Header;
