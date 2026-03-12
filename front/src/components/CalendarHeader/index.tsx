import { useCalendarContext } from "../../hooks/useCalendar";
import {
  Header,
  NavButtons,
  NavButton,
  ViewToggle,
  ViewButton,
  SearchInput,
} from "../CalendarStyles";

type Props = {
  isMounthView: boolean;
  selectedDate: string;
  onViewChange: () => void;
  prev?: () => void;
  next?: () => void;
};

const CalenderHeader: React.FC<Props> = ({
  isMounthView,
  selectedDate,
  onViewChange,
  next,
  prev,
}) => {
  const { search, setSearch } = useCalendarContext();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <Header>
      <NavButtons>
        <NavButton onClick={prev}>&lt;</NavButton>
        <NavButton onClick={next}>&gt;</NavButton>
      </NavButtons>

      <div>{selectedDate}</div>

      <ViewToggle>
        <ViewButton active={isMounthView} onClick={onViewChange}>
          Month
        </ViewButton>
        <ViewButton active={!isMounthView} onClick={onViewChange}>
          Day
        </ViewButton>
      </ViewToggle>

      <SearchInput
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={handleChangeSearch}
      />
    </Header>
  );
};

export default CalenderHeader;
