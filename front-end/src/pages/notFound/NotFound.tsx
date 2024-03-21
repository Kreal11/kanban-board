import { useNavigate } from "react-router";
import { HomeButton } from "../board/Board.styled";
import { NotFoundWrapper } from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <NotFoundWrapper>
      <HomeButton onClick={handleGoHome}>↩ Home</HomeButton>
      <h2>It seems like there is nothing interesting here...</h2>
    </NotFoundWrapper>
  );
};

export default NotFound;
