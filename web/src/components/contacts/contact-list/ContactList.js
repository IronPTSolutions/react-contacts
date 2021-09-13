import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';

import contactsService from '../../../services/contacts-service';
import { useCallback, useEffect, useState } from 'react';

function ContactList() {

  const [state, setState] = useState({ contacts: [], isLoading: true});
  const [fetch, handleFetch] = useState(false);

  const fetchContacts = useCallback(() => handleFetch(!fetch), [fetch]);

  useEffect(() => {
    let isMounted = true;
    contactsService.list()
      .then(contacts => {
        if (isMounted) {
          setState({ contacts, isLoading: false });
        }
      })
      .catch(error => {
        setState({ isLoading: false });
        console.error(error);
      });
    return () => isMounted = false
  }, [fetch]);


  const handleDeleteContact = useCallback((id) => {
    contactsService.remove(id)
      .then(() => fetchContacts())
      .catch(error => console.error(error));
  }, [fetchContacts])

  const handleCreateContact = useCallback((contact) => {
    setState({ contacts: [contact, ...state.contacts] })
  }, [state]);

  const { contacts, isLoading } = state;
  return (
    contacts &&
      <>
        <div className="row mb-2">
          <div className="col">
            <ContactForm onCreateContact={handleCreateContact}/>
          </div>
        </div>
        {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
          <div className="row mb-2">
            <div className="col">
              <ul className="list-group">
                {contacts.map(contact =>
                  <li key={contact.id} className="list-group-item list-group-item-action">
                    <ContactItem {...contact} onDeleteContact={handleDeleteContact} />
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </>
  );

}

export default ContactList;
