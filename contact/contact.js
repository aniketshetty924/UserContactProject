const Contact_Details = require("../contactInfo/contactDetails.js");
const { validateID } = require("../user/user.js");

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
  getContactID() {
    return this.contactID;
  }
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
      throw error;
    }
  }
  static validateContactID(ID) {
    try {
      if (isNaN(ID)) throw new Error("Invalid contact ID");
      if (ID < 0) throw new Error("Invalid contact ID...");
    } catch (error) {
      throw error;
    }
  }
  //get contact by Id
  static getContactByID(contactID, staffContacts) {
    try {
      Contact.validateContactID(contactID);
      let allStaffContacts = staffContacts;
      for (let staffContact of allStaffContacts) {
        if (staffContact.contactID == contactID) {
          if (staffContact.isActive) {
            return staffContact;
          }
        }
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  //update given staff contact
  updateStaffContactByID(parameter, value) {
    try {
      //   if (this.isAdmin)
      //     throw new Error("only staffs can update their contacts...");

      if (typeof parameter != "string") throw new Error("Invalid parameter");
      if (typeof value != "string") throw new Error("invalid value");

      switch (parameter) {
        case "firstName":
          this.updateContactFirstName(value);
          break;

        case "lastName":
          this.updateContactLastName(value);
          break;

        default:
          throw new Error("Enter a valid paramter to change....");
      }
    } catch (error) {
      throw error;
    }
  }

  //update each contact property
  updateContactFirstName(firstName) {
    try {
      if (typeof firstName != "string")
        throw new Error("Enter a valid first name!");

      if (firstName === this.lastName) throw new Error("invalid first name...");
      this.firstName = firstName;
    } catch (error) {
      throw error;
    }
  }

  updateContactLastName(lastName) {
    try {
      if (typeof lastName != "string")
        throw new Error("Enter a valid last name!");

      if (lastName === this.firstName) throw new Error("invalid last name...");
      this.lastName = lastName;
    } catch (error) {
      throw error;
    }
  }

  //Delete contact by ID via staffs
  deleteStaffContactByID(contactID) {
    try {
      Contact.validateContactID(contactID);
      this.isActive = false;
    } catch (error) {
      throw error;
    }
  }

  //create new contact details via particular staffContact
  newContactDetails(numberType, emailType) {
    try {
      if (typeof numberType != "object") throw new Error("invalid numberType");
      if (typeof emailType != "object") throw new Error("invalid email type!");
      let contactDetailsID = this.contactDetails.length;
      let createdContactDetail = Contact_Details.newContactDetails(
        contactDetailsID,
        numberType,
        emailType
      );
      // console.log("Created contact detail");
      // console.log(createdContactDetail);
      this.contactDetails.push(createdContactDetail);
      // console.log("printing this.contactdetails");
      // console.log(this.contactDetails);
    } catch (error) {
      throw error;
    }
  }
  //get all contact details
  getAllContactDetails() {
    return this.contactDetails;
  }
  //get contact details by id
  getContactDetailsByID(cdID) {
    try {
      Contact_Details.validateDetailsID(cdID);
      let allContactDetails = this.contactDetails;
      // let contactDetail = Contact_Details.getContactDetailsByID(
      //   cdID,
      //   allContactDetails
      // );
      let reqContactDetail;
      for (let contactDetail of allContactDetails) {
        if (contactDetail.getContactDetailID() == cdID) {
          reqContactDetail = contactDetail;
        }
      }
      return reqContactDetail;
    } catch (error) {
      throw error;
    }
  }
  //update contact details by id
  updateContactDetailsByID(cdID, parameter, value) {
    try {
      if (!this.isActive)
        throw new Error("oops the contact does not exists .....");

      let reqContactDetail = this.getContactDetailsByID(cdID);
      reqContactDetail.updateContactDetailsByID(parameter, value);
      // console.log("hiiiiii");
      // console.log(contactDetailToUpdate);

      return reqContactDetail;
    } catch (error) {
      throw error;
    }
  }

  //delete Contact detail by ID
  deleteStaffContactDetailByID(cdID) {
    try {
      if (typeof cdID != "number") throw new Error("invalid contact detail id");
      if (cdID < 0) throw new Error("invalid cd id ");
      if (cdID > this.contactDetails.length) throw new Error("invalid cd id");

      this.contactDetails = this.contactDetails.filter(
        (contactDetail) => contactDetail.getContactDetailID() != cdID
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contact;
