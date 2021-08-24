import {useState, useEffect} from 'react'
import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';

import contactsService from '../../../services/contacts-service';

function ContactList () {
  const [contacts, setContacts] = useState([])
  const [isLoading, setLoading] = useState(true)

  function fetchContacts(){
    contactsService.list()
          .then(contacts => {
            setContacts(contacts)
            setLoading(false)
          })
          .catch(error => {
            setLoading(false)
            console.error(error)
          })
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  function handleCreateContact(contact){
      setContacts([contact, ...contacts])
  }

  function handleDeleteContact(id) {
    contactsService.remove(id)
      .then(() => fetchContacts())
      .catch(error => console.error(error));
  }

  return (
    contacts &&
      <>
        <div className="row mb-2">
          <div className="col">
            <ContactForm onCreateContact={(contact) => handleCreateContact(contact)}/>
          </div>
        </div>
        {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
          <div className="row mb-2">
            <div className="col">
              <ul className="list-group">
                {contacts.map(contact =>
                  <li key={contact.id} className="list-group-item list-group-item-action">
                    <ContactItem {...contact} onDeleteContact={(id) => handleDeleteContact(id)} />
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
