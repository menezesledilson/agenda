import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) {
    return null;
  }

  const { summary, description, location, start, end } = event;

  // Função para encontrar e transformar URLs em links clicáveis
  const createLinkFromText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{summary}</h2>
        <p>
          <strong>Início:</strong> {new Date(start.dateTime || start.date).toLocaleString()}
        </p>
        <p>
          <strong>Fim:</strong> {new Date(end.dateTime || end.date).toLocaleString()}
        </p>
        <p>
          <strong>Local:</strong> {location || 'Local não disponível'}
        </p>
        <p>
          <strong>Descrição:</strong> {createLinkFromText(description || 'Descrição não disponível')}
        </p>
        <div className="modal-footer">
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;