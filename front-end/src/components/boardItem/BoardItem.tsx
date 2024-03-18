import sprite from "../../assets/icons/plus.svg";
import { BoardButtonsWrapper, BoardLi } from "./BoardItem.styled";

interface BoardItemProps {
  title?: string;
  theme?: string;
  _id?: string;
}

const BoardItem = ({ title, theme, _id }: BoardItemProps) => {
  return (
    <>
      <BoardLi>
        <h2>{title}</h2>
        <p>{theme}</p>
        <p>{_id}</p>
        <BoardButtonsWrapper>
          <button>
            <svg>
              <use xlinkHref={`${sprite}#icon-edit`} />
            </svg>
            Edit
          </button>
          <button>
            <svg>
              <use xlinkHref={`${sprite}#icon-delete`} />
            </svg>
            Delete
          </button>
        </BoardButtonsWrapper>
      </BoardLi>
    </>
  );
};

export default BoardItem;
