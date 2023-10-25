import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events = [] }) => {
    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "500px", backgroundColor: "white" }}
        />
    );
};

CalendarComponent.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            start: PropTypes.instanceOf(Date).isRequired,
            end: PropTypes.instanceOf(Date).isRequired,
            allDay: PropTypes.bool
        })
    )
};

export default CalendarComponent;
