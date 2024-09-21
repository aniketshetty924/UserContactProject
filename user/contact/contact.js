const { validateID } = require("../user");

class Contact {
  //firstName,lastName,isActive,contactDetails
  constructor(contactID, firstName, lastName, isActive, contactDetails) {
    this.contactID = contactID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.contactDetails = contactDetails;
  }
  //getters
  getContactFirstName() {
    return this.firstName;
  }
  getContactLastName() {
    return this.lastName;
  }
  getContactIsActive() {
    return this.isActive;
  }
  getContactDetails() {
    return this.contactDetails;
  }

  //factory function for Contact
  static newContact(firstName, lastName, ID) {
    try {
      if (typeof firstName != "string") throw new Error("invalid first name");

      if (typeof lastName != "string") throw new Error("invalid last name");

      if (firstName === lastName)
        throw new Error("invalid first name and last name!");
      let contactID = ID;
      let tempContact = new Contact(contactID, firstName, lastName, true, []);
      return tempContact;
    } catch (error) {
      console.log(error);
    }
  }
  static validateContactID(ID) {
    try {
      if (isNaN(ID)) throw new Error("Invalid contact ID");
      if (ID < 0) throw new Error("Invalid contact ID...");
    } catch (error) {
      console.log(error);
    }
  }
  //get contact by Id
  static getContactByID(contactID, staffContacts) {
    try {
      Contact.validateContactID(contactID);
      let allStaffContacts = staffContacts;
      for (let staffContact of allStaffContacts) {
        if (staffContact.contactID == contactID) {
          return staffContact;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  //update given staff contact
  updateStaffContactByID(contactID, parameter, value, staffContactToUpdate) {
    try {
      if (this.isAdmin)
        throw new Error("only staffs can update their contacts...");
      User.validateContactID(contactID);
      if (typeof parameter != "string") throw new Error("Invalid parameter");
      if (typeof value != "string") throw new Error("invalid value");
      Contact.validateContactID(ID);

      let foundStaffContact = staffContact();
      switch (parameter) {
        case "firstName":
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contact;
