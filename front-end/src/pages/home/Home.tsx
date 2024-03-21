import { useSelector } from "react-redux";
import { selectGetBoards, selectIsLoading } from "../../redux/board/selectors";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllBoardsThunk } from "../../redux/board/operations";
import BoardItem from "../../components/boardItem/BoardItem";
import {
  AddBoardWrapper,
  BoardsList,
  BoardsWrapper,
  NoBoardsPlugWrapper,
} from "./Home.styled";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import AddBoardForm from "../../components/addBoardFrom/AddBoardForm";
import { toast } from "react-toastify";
import plusImg from "../../assets/images/plus.png";

const Home = () => {
  const boards = useSelector(selectGetBoards);
  const dispatch = useAppDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getAllBoardsThunk())
      .unwrap()
      .then(() => {
        toast.success("Boards were loaded successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
  }, [dispatch]);

  return (
    <BoardsWrapper>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <BoardsList>
          {(!boards || !boards.length) && (
            <NoBoardsPlugWrapper>
              <p>There are no boards yet. Add new board to see it there</p>
              <AddBoardWrapper onClick={openModal}>
                <img src={plusImg} alt="Plus" />
                <p>Add board</p>
              </AddBoardWrapper>
            </NoBoardsPlugWrapper>
          )}
          {boards.map((board, index) => (
            <React.Fragment key={board._id}>
              {index === 0 && (
                <AddBoardWrapper onClick={openModal}>
                  <img src={plusImg} alt="Plus" />
                  <p>Add board</p>
                </AddBoardWrapper>
              )}
              <BoardItem {...board} />
            </React.Fragment>
          ))}
        </BoardsList>
      )}
      {isOpen && (
        <Modal closeModal={closeModal}>
          <AddBoardForm closeModal={closeModal} />
        </Modal>
      )}
    </BoardsWrapper>
  );
};

export default Home;
