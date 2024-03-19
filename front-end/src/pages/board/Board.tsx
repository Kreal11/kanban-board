import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { getBoardByIdThunk } from "../../redux/board/operations";
import { useSelector } from "react-redux";
import { selectGetBoardById } from "../../redux/board/selectors";
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

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const { cards } = useSelector(selectGetBoardById);
  console.log(cards);

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

  const toDoCards = cards?.filter((card) => card.workStatus === "toDo");
  const inProgressCards = cards?.filter(
    (card) => card.workStatus === "inProgress"
  );
  const doneCards = cards?.filter((card) => card.workStatus === "done");

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Если перетаскивание было отменено или карточка осталась в том же месте, выходим из функции
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Найдем список, из которого была перемещена карточка
    const startList = cards.find(
      (card) => card.workStatus === source.droppableId
    );

    // Найдем список, в который была перемещена карточка
    const endList = cards.find(
      (card) => card.workStatus === destination.droppableId
    );

    // Создадим копию массива карточек из начального списка
    const newStartList = Array.from(startList.cards);

    // Удалим перемещаемую карточку из начального списка
    const [movedCard] = newStartList.splice(source.index, 1);

    // Обновим индекс перемещенной карточки в соответствии с новым списком
    movedCard.index = destination.index;

    // Добавим перемещенную карточку в конечный список
    endList.cards.splice(destination.index, 0, movedCard);

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

                    {toDoCards?.map((card, index) => (
                      <CardItem key={card._id} {...card} index={index} />
                    ))}
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
                    {inProgressCards?.map((card, index) => (
                      <CardItem key={card._id} {...card} index={index} />
                    ))}
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
                    {doneCards?.map((card, index) => (
                      <CardItem key={card._id} {...card} index={index} />
                    ))}
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
