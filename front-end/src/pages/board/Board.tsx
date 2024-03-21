import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import {
  selectError,
  selectGetBoardById,
  selectIsLoading,
} from "../../redux/board/selectors";
import { toast } from "react-toastify";
import {
  BoardWrapper,
  CardList,
  CardListWrapper,
  CardListsWrapper,
  CardPlusImgWrapper,
  HomeButton,
} from "./Board.styled";
import CardItem from "../../components/cardItem/CardItem";
import Modal from "../../components/modal/Modal";
import AddCardForm from "../../components/addCardForm/AddCardForm";
import { useModal } from "../../hooks/useModal";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  updateCardOrderThunk,
  updateCardWorkStatusThunk,
} from "../../redux/card/operations";
import { Card } from "../../redux/board/types";
import plusImg from "../../assets/images/plus.png";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { cards } = useSelector(selectGetBoardById);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [toDo, setToDo] = useState<Card[]>([]);
  const [inProgress, setInProgress] = useState<Card[]>([]);
  const [done, setDone] = useState<Card[]>([]);

  useEffect(() => {
    if (cards && !isLoading) {
      const toDoCards = cards.filter((card) => card.workStatus === "toDo");
      const inProgressCards = cards.filter(
        (card) => card.workStatus === "inProgress"
      );
      const doneCards = cards.filter((card) => card.workStatus === "done");

      const sortedToDo = toDoCards.sort((a, b) => a.cardOrder - b.cardOrder);
      const sortedInProgress = inProgressCards.sort(
        (a, b) => a.cardOrder - b.cardOrder
      );
      const sortedDone = doneCards.sort((a, b) => a.cardOrder - b.cardOrder);

      setToDo(sortedToDo);
      setInProgress(sortedInProgress);
      setDone(sortedDone);
    }
  }, [cards, isLoading]);

  useEffect(() => {
    dispatch(getBoardByIdThunk(id))
      .unwrap()
      .then(() => {
        toast.success("Board info was loaded successfully!");
      })
      .catch(() => {
        toast.warning("Oops, something went wrong! Try again, please!");
      });
  }, [dispatch, id]);

  const handleGoHome = () => {
    navigate("/");
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const updatedToDo = [...toDo];
    const updatedInProgress = [...inProgress];
    const updatedDone = [...done];

    const movedCard =
      updatedToDo.find((card) => card._id === draggableId) ||
      updatedInProgress.find((card) => card._id === draggableId) ||
      updatedDone.find((card) => card._id === draggableId);

    let sourceList;
    switch (source.droppableId) {
      case "toDo":
        sourceList = updatedToDo;
        break;
      case "inProgress":
        sourceList = updatedInProgress;
        break;
      case "done":
        sourceList = updatedDone;
        break;
      default:
        sourceList = null;
    }

    if (sourceList) {
      sourceList.splice(source.index, 1);

      const updatedSourceList = sourceList.map((card, index) => ({
        ...card,
        cardOrder: index,
      }));

      Promise.all(
        updatedSourceList.map((card) =>
          dispatch(
            updateCardOrderThunk({
              id: card._id,
              cardOrder: card.cardOrder,
            })
          )
        )
      );

      switch (source.droppableId) {
        case "toDo":
          setToDo(updatedSourceList);
          break;
        case "inProgress":
          setInProgress(updatedSourceList);
          break;
        case "done":
          setDone(updatedSourceList);
          break;
        default:
          break;
      }
    }

    let destinationList;
    switch (destination.droppableId) {
      case "toDo":
        destinationList = updatedToDo;
        break;
      case "inProgress":
        destinationList = updatedInProgress;
        break;
      case "done":
        destinationList = updatedDone;
        break;
      default:
        destinationList = null;
    }

    if (destinationList && movedCard) {
      destinationList.splice(destination.index, 0, movedCard);

      const updatedDestinationList = destinationList.map((card, index) => ({
        ...card,
        cardOrder: index,
      }));

      Promise.all(
        updatedDestinationList.map((card) =>
          dispatch(
            updateCardOrderThunk({
              id: card._id,
              cardOrder: card.cardOrder,
            })
          )
        )
      );

      switch (source.droppableId) {
        case "toDo":
          setToDo(updatedDestinationList);
          break;
        case "inProgress":
          setInProgress(updatedDestinationList);
          break;
        case "done":
          setDone(updatedDestinationList);
          break;
        default:
          break;
      }
    }

    setToDo(updatedToDo);
    setInProgress(updatedInProgress);
    setDone(updatedDone);

    if (source.droppableId !== destination.droppableId) {
      let updatedList;
      switch (destination.droppableId) {
        case "toDo":
          updatedList = [...toDo];
          break;
        case "inProgress":
          updatedList = [...inProgress];
          break;
        case "done":
          updatedList = [...done];
          break;
        default:
          updatedList = null;
      }

      if (updatedList) {
        const movedCard = updatedList.find((card) => card._id === draggableId);
        if (movedCard) {
          updatedList.splice(destination.index, 0, movedCard);
          updatedList = updatedList.map((card, index) => ({
            ...card,
            cardOrder: index,
          }));

          Promise.all(
            updatedList.map((card) =>
              dispatch(
                updateCardOrderThunk({
                  id: card._id,
                  cardOrder: card.cardOrder,
                })
              )
            )
          );

          switch (destination.droppableId) {
            case "toDo":
              setToDo(updatedList);
              break;
            case "inProgress":
              setInProgress(updatedList);
              break;
            case "done":
              setDone(updatedList);
              break;
            default:
              break;
          }
        }
      }
      setTimeout(() => {
        Promise.all([
          dispatch(
            updateCardWorkStatusThunk({
              id: draggableId,
              workStatus: destination.droppableId,
            })
          ),
          dispatch(
            updateCardOrderThunk({
              id: draggableId,
              cardOrder: destination.index,
            })
          ),
        ]);
      }, 0);
    }
  };

  return (
    <>
      <BoardWrapper>
        <HomeButton onClick={handleGoHome}>↩ Home</HomeButton>
        {error && <p>Maybe, ID of board is wrong. Try again, please</p>}
        {!error && (
          <DragDropContext onDragEnd={onDragEnd}>
            <CardListsWrapper>
              <Droppable droppableId="toDo">
                {(provided) => (
                  <CardListWrapper>
                    <h2>To Do</h2>
                    <CardPlusImgWrapper onClick={openModal}>
                      <img src={plusImg} alt="Plus" />
                    </CardPlusImgWrapper>
                    <CardList
                      $toDo="toDo"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {toDo?.map((card, index) => (
                        <CardItem key={card._id} {...card} index={index} />
                      ))}
                      {!cards.length && (
                        <p>
                          There are no cards yet. Add new card to see it in the
                          list
                        </p>
                      )}
                      {provided.placeholder}
                    </CardList>
                  </CardListWrapper>
                )}
              </Droppable>

              <Droppable droppableId="inProgress">
                {(provided) => (
                  <CardListWrapper>
                    <h2>In Progress</h2>
                    <CardList
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {inProgress?.map((card, index) => (
                        <CardItem key={card._id} {...card} index={index} />
                      ))}
                      {!inProgress.length && (
                        <p>Move the card in this column to see it there</p>
                      )}
                      {provided.placeholder}
                    </CardList>
                  </CardListWrapper>
                )}
              </Droppable>

              <Droppable droppableId="done">
                {(provided) => (
                  <CardListWrapper>
                    <h2>Done</h2>
                    <CardList
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {done?.map((card, index) => (
                        <CardItem key={card._id} {...card} index={index} />
                      ))}
                      {!done.length && (
                        <p>Move the card in this column to see it there</p>
                      )}
                      {provided.placeholder}
                    </CardList>
                  </CardListWrapper>
                )}
              </Droppable>
            </CardListsWrapper>
          </DragDropContext>
        )}
      </BoardWrapper>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <AddCardForm closeModal={closeModal} newCardOrder={toDo.length} />
        </Modal>
      )}
    </>
  );
};

export default Board;
