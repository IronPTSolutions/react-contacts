import ContactItem from '../contact-item/ContactItem';
import ContactForm from '../contact-form/ContactForm';
import { useEffect, useState } from 'react';
import axios from 'axios'

function ContactList(props) {
  const [contacts, setContacts] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/api/contacts')
      .then(response => {
        setContacts(response.data)
      })
      .catch(err => console.error(err))
  }, [])

  function DeleteContact(id) {
    axios.delete(`http://localhost:3001/api/contacts/${id}`)
      .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
      .catch(err => console.error(err))
  }


  function handleCreateContact(contact) {
    setContacts([contact, ...contacts])
  }

  if (!contacts) return <> </>

  return (
    contacts &&
    <>
      <div className="row mb-2">
        <div className="col">
          <ContactForm onCreateContact={(contact) => handleCreateContact(contact)} />
        </div>
      </div>
      <div className="row mb-2">
        {contacts.map(contact => (
          <li key={contact.id}>
            <ContactItem {...contact}  onDeleteContact={DeleteContact}/>
          </li>
        ))}
      </div>

    </>
  );


}


export default ContactList;

  /* 
    fetchContacts() {
      contactsService.list()
        .then(contacts => this.setState({ contacts, isLoading: false }))
        .catch(error => {
          this.setState({ isLoading: false })
          console.error(error)
        });
    }
  
    componentDidMount() {
      this.fetchContacts();
    }
    
    
    handleDeleteContact(id) {
      contactsService.remove(id)
        .then(() => this.fetchContacts())
        .catch(error => console.error(error));
    }
  
    handleCreateContact(contact) {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts]
      }))
    } */