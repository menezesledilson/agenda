import React, { useState, useEffect } from 'react';
import EventModal from './modal';
import './Calendar.css';  

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // Fixed typo here

  const API_KEY ='AIzaSyB_mDE5CYOoL19wwgKFjjmlOM5dAk4nKKo';
  const CALENDAR_ID ='ledilsondev@gmail.com'

  useEffect(() => {
    const fetchEvents = async () => {
      if (!API_KEY || !CALENDAR_ID) {
        console.error('Chave da API ou ID do calendário não definidos.');
        return;
      }

      try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&conferenceDataVersion=1&timeMin=${startOfDay.toISOString()}&timeMax=${endOfDay.toISOString()}`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar eventos');
        }

        const data = await response.json();
        const sortedEvents = (data.items || []).sort((a, b) => {
          const startA = new Date(a.start?.dateTime || a.start?.date);
          const startB = new Date(b.start?.dateTime || b.start?.date);
          return startA - startB;
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, [date, API_KEY, CALENDAR_ID]);

  const formatDate = (dateTime) => {
    if (!dateTime) return 'Data não disponível';
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' });
  };

  const handleDateChange = (offset) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true); // Fixed typo here
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fixed typo here
  };

  return (
    <div className="container">
      <h1>Eventos</h1>
      <div className="button-container">
        <button className="navigation-button" onClick={() => handleDateChange(-1)}>Dia Anterior</button>
        <button className="navigation-button" onClick={() => handleDateChange(1)}>Próximo Dia</button>
      </div>
      <h2>Eventos para {date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</h2>
      <ul className="event-list">
        {events.length > 0 ? (
          events.map((event) => {
            const startDate = formatDate(event.start?.dateTime);
            const endDate = formatDate(event.end?.dateTime);
            const location = event.location || 'Local não disponível';

            return (
              <li key={event.id} className="event-card">
                <h3>{event.summary}</h3>
                <p>Início: {startDate}</p>
                <p>Fim: {endDate}</p>
                <p>Local: {location}</p>
                <button className="details-button" onClick={() => openModal(event)}>Ver Detalhes</button>
              </li>
            );
          })
        ) : (
          <p>Nenhum evento disponível para a data selecionada.</p>
        )}
      </ul>

      {/* Modal para o evento */}
      <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default Calendar;