import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events = [], onEventClick }) => {
    const [selecting, setSelecting] = useState(false);

    const handleSelectSlot = ({ start, end }) => {
        if (selecting) {
            // Abre un formulario o modal para ingresar detalles del evento
            const title = prompt('Ingrese el título del evento');
            if (title) {
                const newEvent = {
                    title,
                    start,
                    end,
                };
                onEventClick(newEvent);
            }
            setSelecting(false);
        } else {
            setSelecting(true);
        }
    };

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={handleSelectSlot}
            style={{ height: '500px', backgroundColor: 'white' }}
        />
    );
};

CalendarComponent.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            start: PropTypes.instanceOf(Date).isRequired,
            end: PropTypes.instanceOf(Date).isRequired,
            allDay: PropTypes.bool,
        })
    ),
    onEventClick: PropTypes.func.isRequired,
};

export default CalendarComponent;
