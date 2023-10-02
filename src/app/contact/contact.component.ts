import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  newContact: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  contacts: Contact[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone' ,'delete' ,'edit'];
  constructor(private contactService: ContactService) {}
  searchQuery: string = '';
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.contactService.addContact(this.newContact);
      this.newContact = { id: 0, name: '', email: '', phone: '' };
    }
  }

  updateContact(updatedContact: Contact): void {
    this.contactService.updateContact(updatedContact);
  }

  deleteContact(contact:Contact): void {
    this.contactService.deleteContact(contact);
  }
  editContact(contact: Contact): void {
    contact.isEditing = true; // Set the flag to enable editing
  }

  // Handle cell blur (when user clicks outside or presses Enter)
  onCellBlur(contact: Contact): void {
    contact.isEditing = false; // Set the flag to disable editing
  }
  // applyFilter(): void {
  //   const filterValue = this.searchQuery.toLowerCase().trim();
  //   this.contacts = this.contacts.filter((contact) =>
  //     contact.name.toLowerCase().includes(filterValue) ||
  //     contact.email.toLowerCase().includes(filterValue) ||
  //     contact.phone.toLowerCase().includes(filterValue)
  //   );
  // }
  searchContact(query: string): void {
    if (query) {
      this.contacts = this.contactService.searchContact(query);
    } else {
      this.contactService.getContacts().subscribe((contacts) => {
        this.contacts = contacts;
      });
    }
  }
}
