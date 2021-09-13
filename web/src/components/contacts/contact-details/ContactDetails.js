import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import contactsService from '../../../services/contacts-service';

function ContactDetails() {

  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let isMounted = true;
    contactsService.details(id)
      .then(contact => {
        if (isMounted) {
          // solo actualizamos el estado si el componente sige exisitiendo
          setContact(contact)
        }
      })
    return () => isMounted = false;
  }, [id]);

  return contact && (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-1">
          <img src={contact.avatar} className="img-fluid rounded-start" alt={contact.name} />
        </div>
        <div className="col-md-11">
          <div className="card-body">
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text"><small className="text-muted">{contact.email} - {contact.phone}</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails;
