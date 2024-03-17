import { useForm } from "react-hook-form";
import { Button, HeaderForm, HeaderWrapper, Input } from "./Header.styled";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const submit = (data: string): void => {
    reset();
    navigate(`api/boards/${data.id}`);
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
