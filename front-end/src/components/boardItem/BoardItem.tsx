interface BoardItemProps {
  title?: string;
  theme?: string;
  _id?: string;
}

const BoardItem = ({ title, theme, _id }: BoardItemProps) => {
  return (
    <>
      <li>
        <h2>{title}</h2>
        <p>{theme}</p>
      </li>
    </>
  );
};

export default BoardItem;
