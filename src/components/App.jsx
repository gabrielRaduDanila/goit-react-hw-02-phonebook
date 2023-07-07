import { Component } from 'react';
import ContactForm from './contact-form/ContactForm';
import ContactList from './contact-list/ContactList';
import Filter from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = contact => {
    const tempContacs = [...this.state.contacts];
    tempContacs.push(contact);
    this.setState({
      contacts: tempContacs,
    });
  };
  addFilterValue = value => {
    this.setState({
      filter: value,
    });
  };

  removeContact = id => {
    const tempContact = [...this.state.contacts];
    const newContacts = tempContact.filter(contact => contact.id !== id);
    this.setState({
      contacts: newContacts,
    });
  };

  findFilteredContacts = () => {
    const contacts = this.state.contacts;
    const typedName = this.state.filter.toLowerCase();
    const filterdContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(typedName);
    });
    return filterdContact;
  };

  render() {
    const contacts = this.state.contacts;
    const filter = this.state.filter;
    return (
      <div style={{ padding: 20 }}>
        <h1>Phonebook</h1>
        <div>
          <h2>Contacts</h2>
          <ContactForm
            contacts={this.state.contacts}
            addContact={this.addContact}
          />
        </div>
        {contacts.length > 0 && filter.length === 0 && (
          <ContactList contacts={contacts} removeContact={this.removeContact} />
        )}
        {contacts.length > 0 && <Filter addFilterValue={this.addFilterValue} />}
        {filter.length > 0 && (
          <ContactList
            contacts={this.findFilteredContacts()}
            removeContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
