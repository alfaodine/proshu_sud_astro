import { useState, useEffect } from 'react';
import ConsultationForm from './ConsultationForm';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modalBtn') || target.closest('.modalBtn')) {
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }} onClick={(e) => {
      if ((e.target as HTMLElement).classList.contains('modal')) setIsOpen(false);
    }}>
      <div className="modal-content">
        <div className="modal-body">
          <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
          <ConsultationForm formId="modal_form" className="form" />
        </div>
      </div>
    </div>
  );
}
