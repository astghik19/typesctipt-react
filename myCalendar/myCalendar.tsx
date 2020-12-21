import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { fontFamily } from 'src/styles/base';
import { colors } from 'src/styles/colors';

const maxWidth = 430;
const calPadding = 20;
const tileDimension = (maxWidth - 2 * calPadding) / 7;

const highlightDate = (date: string, view: string, dateRanges) => {
  dayjs.extend(isBetween);
  const formatedDate = dayjs(date);
  const firstIsSame = dateRanges.find((date) => {
    return dayjs(date.since).isSame(formatedDate, 'day');
  });
  const lastIsSame = dateRanges.find((date) => {
    return dayjs(date.till).isSame(formatedDate, 'day');
  });
  if (firstIsSame && lastIsSame) {
    return ['singleDay', 'highlightedTile'];
  } else if (firstIsSame) {
    return ['firstDay', 'highlightedTile'];
  } else if (lastIsSame) {
    return ['lastDay', 'highlightedTile'];
  }
  const between = dateRanges.find((date) => {
    return formatedDate.isBetween(dayjs(date.since), dayjs(date.till));
  });

  return between && view === 'month' ? 'highlightedTile' : 'tile';
};

interface ComponentProps {
  // TODO: Add correct function type
  onChange: any;
  dateRanges: Date[];
}

interface Date {
  since: string;
  till: string;
}

const MyCalendar: React.FC<ComponentProps> = ({ onChange, dateRanges }) => {
  return (
    <Wrapper>
      <Calendar
        locale="en-GB"
        prev2Label={null}
        next2Label={null}
        prevLabel={<RiArrowLeftSLine />}
        nextLabel={<RiArrowRightSLine />}
        minDetail="year"
        showNeighboringMonth={false}
        onChange={onChange}
        //TODO: Fix in future. Month switch was not working.
        // activeStartDate={dateRanges && new Date(dateRanges[0]?.since)}
        tileClassName={(props) => {
          return highlightDate(props.date, props.view, dateRanges);
        }}
        className="calendar"
      />
    </Wrapper>
  );
};

export default MyCalendar;

const Wrapper = styled.div`
  .tile {
    background: transparent;
    border: 0;
    margin: 2px 0;
  }
  .highlightedTile {
    background: ${colors.background.secondary};
    color: ${colors.text.white};
    border: 0;
    margin: 2px 0;
  }
  .firstDay {
    border-radius: ${`${tileDimension / 2}px 0 0 ${tileDimension / 2}px`};
    border: 0;
    margin: 2px 0;
  }
  .lastDay {
    border-radius: ${`0 ${tileDimension / 2}px ${tileDimension / 2}px 0`};
    border: 0;
    margin: 2px 0;
  }
  .singleDay {
    border-radius: 50%;
    border: 0;
    margin: 2px 0;
  }
  .calendar {
    background: transparent;
    font-family: ${fontFamily};
  }

  .react-calendar__tile {
    padding: 0;
    width: ${`${tileDimension}px`};
    height: ${`${tileDimension}px`};
    box-shadow: none;
    :hover {
      cursor: pointer;
    }
  }

  .react-calendar__tile--active {
    border-radius: 50%;
    color: ${colors.text.white};
    background: ${colors.background.shipmentDetails};
  }
  .react-calendar__month-view__weekdays {
    align-content: center;
    margin: 15px;
    opacity: 0.5;
    font: bold 11px/14px ${fontFamily};
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__label,
  .react-calendar__navigation__next-button {
    background: transparent;
    border: none;
    span {
      color: ${colors.text.lightBlue};
      font: 500 16px/21px ${fontFamily};
    }
  }
  .react-calendar__navigation__label__labelText {
    :hover {
      cursor: pointer;
    }
  }
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    background: transparent;
    border: none;
    border: 1px solid rgb(17 36 70 / 0.17);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    :hover {
      cursor: pointer;
    }
  }
  button {
    outline: none;
  }
`;
