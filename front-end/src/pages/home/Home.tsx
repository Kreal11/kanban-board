import { useSelector } from "react-redux";
import { selectGetBoards } from "../../redux/board/selectors";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllBoardsThunk } from "../../redux/board/operations";
import BoardItem from "../../components/boardItem/BoardItem";
import { AddBoardWrapper, BoardsList, BoardsWrapper } from "./Home.styled";
import sprite from "../../assets/icons/plus.svg";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import AddBoardForm from "../../components/addBoardFrom/AddBoardForm";
import { toast } from "react-toastify";

const Home = () => {
  const boards = useSelector(selectGetBoards);
  const dispatch = useAppDispatch();
  const { isOpen, openModal, closeModal } = useModal();

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
      <BoardsList>
        {(!boards || !boards.length) && (
          <AddBoardWrapper onClick={openModal}>
            <svg>
              <use xlinkHref={`${sprite}#icon-plus`} />
            </svg>
            <p>Add board</p>
          </AddBoardWrapper>
        )}
        {boards?.length &&
          boards.map((board, index) => (
            <React.Fragment key={board._id}>
              {index === 0 && (
                <AddBoardWrapper onClick={openModal}>
                  <svg>
                    <use xlinkHref={`${sprite}#icon-plus`} />
                  </svg>
                  <p>Add board</p>
                </AddBoardWrapper>
              )}
              <BoardItem {...board} />
            </React.Fragment>
          ))}
      </BoardsList>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <AddBoardForm closeModal={closeModal} />
        </Modal>
      )}
    </BoardsWrapper>
  );
};

export default Home;
