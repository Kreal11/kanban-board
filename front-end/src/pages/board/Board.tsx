import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import {
  selectGetBoardById,
  selectIsLoading,
} from "../../redux/board/selectors";
import { toast } from "react-toastify";
import {
  BoardWrapper,
  CardList,
  CardListWrapper,
  CardListsWrapper,
  CardPlusSvg,
  HomeButton,
} from "./Board.styled";
import CardItem from "../../components/cardItem/CardItem";
import sprite from "../../assets/icons/plus.svg";
import Modal from "../../components/modal/Modal";
import AddCardForm from "../../components/addCardForm/AddCardForm";
import { useModal } from "../../hooks/useModal";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  updateCardOrderThunk,
  updateCardWorkStatusThunk,
} from "../../redux/card/operations";
import { Card } from "../../redux/board/types";

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { cards } = useSelector(selectGetBoardById);
  const isLoading = useSelector(selectIsLoading);
  console.log(cards);

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
    console.log(destination?.index);
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const updatedToDo = [...toDo];
      const updatedInProgress = [...inProgress];
      const updatedDone = [...done];

      const movedCard =
        updatedToDo.find((card) => card._id === draggableId) ||
        updatedInProgress.find((card) => card._id === draggableId) ||
        updatedDone.find((card) => card._id === draggableId);

      // Удаляем карточку из исходного списка
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
      }

      // Добавляем карточку в конечный список
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
      }

      setToDo(updatedToDo);
      setInProgress(updatedInProgress);
      setDone(updatedDone);

      setTimeout(async () => {
        await dispatch(
          updateCardWorkStatusThunk({
            id: draggableId,
            workStatus: destination.droppableId,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Card status was changed successfully!");
          })
          .catch(() => {
            toast.warning("Oops, something went wrong! Try again, please!");
          });
      }, 0);
    }

    if (source.droppableId === destination.droppableId) {
      setTimeout(async () => {
        await dispatch(
          updateCardOrderThunk({
            id: draggableId,
            cardOrder: destination.index,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("Card order was changed successfully!");
          })
          .catch(() => {
            toast.warning("Oops, something went wrong! Try again, please!");
          });
      }, 0);
    }

    // Найдем список, из которого была перемещена карточка
    // const startList = cards.filter(
    //   (card) => card.workStatus === source.droppableId
    // );

    // Найдем список, в который была перемещена карточка
    // const endList = cards.filter(
    //   (card) => card.workStatus === destination.droppableId
    // );

    // Создадим копию массива карточек из начального списка
    // const newStartList = [...startList];

    // Удалим перемещаемую карточку из начального списка
    // const [movedCard] = newStartList.splice(source.index, 1);
    // const newMovedCard = { ...movedCard };

    // Обновим индекс перемещенной карточки в соответствии с новым списком
    // newMovedCard.index = destination.index;

    // Добавим перемещенную карточку в конечный список
    // endList.splice(destination.index, 0, newMovedCard);

    // Обновим состояние вашего приложения, например, отправим запрос на сервер для сохранения изменений
    // dispatch(updateCardPositionThunk(movedCard, endList._id));

    // Обновим состояние вашего приложения
    // setCards(...);
  };

  return (
    <>
      <BoardWrapper>
        <HomeButton onClick={handleGoHome}>↩ Home</HomeButton>

        <DragDropContext onDragEnd={onDragEnd}>
          <CardListsWrapper>
            <Droppable droppableId="toDo">
              {(provided) => (
                <CardListWrapper>
                  <h2>To Do</h2>
                  <CardList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <CardPlusSvg onClick={openModal}>
                      <use xlinkHref={`${sprite}#icon-plus`} />
                    </CardPlusSvg>

                    {toDo?.map((card, index) => (
                      <CardItem key={card._id} {...card} index={index} />
                    ))}
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
                    {provided.placeholder}
                  </CardList>
                </CardListWrapper>
              )}
            </Droppable>
          </CardListsWrapper>
        </DragDropContext>
      </BoardWrapper>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <AddCardForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default Board;
