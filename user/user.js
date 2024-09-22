const Contact_Details = require("../contactInfo/contactDetails.js");
// const Contact = require("./contact/contact.js");
const Contact = require("../contact/contact.js");

class User {
  //firstName,lastName,isAdmin,isActive,contacts
  static #allAdmin = [];
  static #allStaff = [];
  static allUsersID = 0;
  #userID;

  //getters
  static getAllUsersID() {
    return this.allUsersID;
  }
  getUserID() {
    return this.#userID;
  }
  getUserFirstName() {
    return this.firstName;
  }
  getIsAdmin() {
    return this.isAdmin;
  }
  getUserContacts() {
    let allUserContacts = [];
    allUserContacts = this.contacts;
    let allUserContactsList = [];
    allUserContactsList = allUserContacts.filter((obj) => {
      return obj.isActive === true;
    });
    return allUserContactsList;
  }
  static getAllAdmin() {
    return User.#allAdmin;
  }
  static getAllStaff() {
    let allStaffs = this.#allStaff;
    let staffList = [];
    for (let staff of allStaffs) {
      if (staff.isActive) {
        staffList.push(staff);
      }
    }
    return staffList;
  }

  constructor(userID, firstName, lastName, isAdmin, isActive, contacts) {
    this.#userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = isAdmin;
    this.isActive = isActive;
    this.contacts = contacts;
  }
  //user factory function
  //admin factory function
  static newAdmin(firstName, lastName) {
    try {
      if (typeof firstName != "string") throw new Error("invalid first name");

      if (typeof lastName != "string") throw new Error("invalid last name");

      if (firstName === lastName)
        throw new Error("invalid first name and last name!");

      let userID = User.allUsersID++;

      let tempAdmin = new User(userID, "Aniket", "Shetty", true, true, []);
      User.#allAdmin.push(tempAdmin);
      return tempAdmin;
    } catch (error) {
      console.log(error);
    }
  }

  //staff factory fnction which can only be called by admin . thats why this functionn is non static bcoz admin is calling this function
  newStaff(firstName, lastName) {
    try {
      if (this.isAdmin == false)
        throw new Error("only admins can create a staff!");

      if (typeof firstName != "string") throw new Error("invalid first name");

      if (typeof lastName != "string") throw new Error("invalid last name");

      if (firstName === lastName)
        throw new Error("invalid first name and last name!");

      let userID = User.allUsersID++;

      let tempStaff = new User(userID, firstName, lastName, false, true, []);
      User.#allStaff.push(tempStaff);
      return tempStaff;
    } catch (error) {
      console.log(error);
    }
  }
  //validate ID
  static validateID(ID) {
    try {
      if (isNaN(ID)) throw new Error("Enter a valid ID number...");
      if (ID < 0) throw new Error("Enter a valid ID!");

      if (ID >= User.#allAdmin.length + User.#allStaff.length)
        throw new Error("Enter a valid ID!");
    } catch (error) {
      console.log(error);
    }
  }
  static getUserViaID(ID, isAdmin, isStaff) {
    try {
      if (isNaN(ID)) throw new Error("invalid ID...");
      if (isAdmin) {
        let allAdmins = User.#allAdmin;
        for (let admin of allAdmins) {
          if (admin.#userID == ID) {
            return admin;
          }
        }
      }
      if (isStaff) {
        let allStaffs = User.#allStaff;
        for (let staff of allStaffs) {
          if (staff.#userID == ID) {
            if (!staff.isActive)
              throw new Error(
                `Oops staff with ID ${ID} is already been deleted... so you cant access it now!`
              );
            return staff;
          }
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
  //get user by id
  static getUserByID(userID) {
    try {
      User.validateID(userID);
      return User.getUserViaID(userID, true, true);
    } catch (error) {
      console.log(error);
    }
  }
  //get staff by id via admin
  getStaffByID(staffID) {
    try {
      if (!this.getIsAdmin())
        throw new Error("staff can only be accessed by admin...");
      User.validateID(staffID);
      let allStaffs = User.#allStaff;
      for (let staff of allStaffs) {
        if (staff.#userID == staffID) {
          if (!staff.isActive)
            throw new Error(
              `Oops staff with ID ${staffID} is already been deleted... so you cant access it now!`
            );
          return staff;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
  //update staff each property
  updateFirstName(firstName) {
    try {
      if (typeof firstName != "string")
        throw new Error("Enter a valid first name!");

      if (firstName === this.lastName) throw new Error("invalid first name...");
      this.firstName = firstName;
    } catch (error) {
      console.log(error);
    }
  }
  updateLastName(lastName) {
    try {
      if (typeof lastName != "string")
        throw new Error("Enter a valid last name!");

      if (lastName === this.firstName) throw new Error("invalid last name...");
      this.lastName = lastName;
    } catch (error) {
      console.log(error);
    }
  }
  //update staff by ID via admin
  updateUserByID(staffID, parameter, value) {
    try {
      if (!this.getIsAdmin())
        throw new Error("staff can only be updated by an admin...");

      User.validateID(staffID);
      if (typeof parameter != "string")
        throw new Error("enter a valid parameter");
      let foundStaff = this.getStaffByID(staffID);

      if (!foundStaff.isActive)
        throw new Error(
          `User with ID ${staffID} has been deleted earlier...., So it cannot be UPDATED!`
        );

      switch (parameter) {
        case "firstName":
          foundStaff.updateFirstName(value);
          break;
        case "lastName":
          foundStaff.updateLastName(value);
          break;
        default:
          console.log("Enter a valid parameter to change...");
      }
      return foundStaff;
    } catch (error) {
      console.log(error);
    }
  }

  //delete staff by id via admin
  deleteUserByID(staffID) {
    try {
      if (this.isAdmin == false)
        throw new Error("staff can only be deleted by Admin");

      User.validateID(staffID);
      let foundStaff = this.getStaffByID(staffID);
      if (!foundStaff.isActive)
        throw new Error(
          `The given staff with ID ${staffID} is already been deleted earlier....,NOTHING to delete now!`
        );

      foundStaff.isActive = false;
      // let allStaffs = User.#allStaff;

      // const indexOfFoundStaff = allStaffs.findIndex((obj) => {
      //   return obj.#userID == staffID;
      // });
      // allStaffs.splice(indexOfFoundStaff, 1);
      console.log(`Staff with staff ID ${staffID} is deleted...`);
    } catch (error) {
      console.log(error);
    }
  }

  //creating contact object for particular staff object
  newContact(firstName, lastName) {
    try {
      if (this.isAdmin) throw new Error("Only staffs can create contacts...");
      if (!this.isActive)
        throw new Error(
          "The  User  is already been deleted earlier...., So it cannot create a new contact now!"
        );
      if (typeof firstName != "string") throw new Error("invalid first name");

      if (typeof lastName != "string") throw new Error("invalid last name");

      if (firstName === lastName)
        throw new Error("invalid first name and last name!");

      let contactID = this.contacts.length;
      let createdContact = Contact.newContact(firstName, lastName, contactID);
      this.contacts.push(createdContact);
    } catch (error) {
      console.log(error);
    }
  }

  getContactByID(contactID) {
    try {
      if (this.isAdmin) throw new Error("only staffs can get contacts ....");
      if (!this.isActive)
        throw new Error(
          "The  User  is already been deleted earlier...., So it cannot GET a contact now!"
        );
      if (contactID >= this.contacts.length)
        throw new Error("invalid contact id..");
      Contact.validateContactID(contactID);
      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);
      //   console.log("test this..");
      //   console.log(staffContact);
      return staffContact;
    } catch (error) {
      console.log(error);
    }
  }

  //validate contact ID
  static validateContactID(ID) {
    try {
      if (isNaN(ID)) throw new Error("Invalid contact ID");
      if (ID < 0) throw new Error("Invalid contact ID...");
    } catch (error) {
      console.log(error);
    }
  }
  //update given staff contact by ID
  updateStaffContactByID(contactID, parameter, value) {
    try {
      if (this.isAdmin)
        throw new Error("only staffs can update their contacts...");
      if (!this.isActive)
        throw new Error(
          "The  User  is already been deleted earlier...., So it cannot update a contacts now!"
        );
      if (contactID >= this.contacts.length)
        throw new Error("invalid contact id..");
      User.validateContactID(contactID);
      if (typeof parameter != "string") throw new Error("Invalid parameter");
      if (typeof value != "string") throw new Error("invalid value");
      let allContacts = this.contacts;
      let staffContactToUpdate = Contact.getContactByID(contactID, allContacts);
      //   console.log("testing updatestaffContact now....");
      //   console.log(staffContactToUpdate);
      let updatedStaffContact = Contact.updateStaffContactByID(
        contactID,
        parameter,
        value,
        staffContactToUpdate
      );

      return updatedStaffContact;
    } catch (error) {
      console.log(error);
    }
  }

  //delete staff contact by ID via staff
  deleteStaffContactByID(contactID) {
    try {
      if (this.isAdmin)
        throw new Error("contacts can only be deleted by staffs....");
      if (!this.isActive)
        throw new Error(
          "The staff which is trying to delete a contact does not exists...."
        );
      if (contactID >= this.contacts.length)
        throw new Error("invalid contact id..");
      Contact.validateContactID(contactID);
      let allContacts = this.contacts;
      let staffContactToDelete = Contact.getContactByID(contactID, allContacts);
      Contact.deleteStaffContactByID(contactID, staffContactToDelete);
    } catch (error) {
      console.log(error);
    }
  }

  //create new contact details via staffContact
  newContactDetails(contactID, numberType, emailType) {
    try {
      if (this.isAdmin)
        throw new Error("Only staffs can create new contact details....");
      if (!this.isActive)
        throw new Error("OOps the current staff is does not exists!");
      if (contactID >= this.contacts.length)
        throw new Error("invalid contact id..");
      User.validateContactID(contactID);
      if (typeof numberType != "object") throw new Error("invalid numberType");
      if (typeof emailType != "object") throw new Error("invalid email type!");
      // console.log("in user new contact details");

      // console.log(numberType);
      // console.log(emailType);
      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);

      staffContact.newContactDetails(numberType, emailType);
    } catch (error) {
      console.log(error);
    }
  }

  //get contact details by id via staff
  //cd->contact detail
  getContactDetailsByID(contactID, cdID) {
    try {
      if (this.isAdmin)
        throw new Error("Only staffs can access contact details!");
      if (!this.isActive)
        throw new Error("OOps staff is already been deleted....");
      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);
      let contactDetail = staffContact.getContactDetails(cdID);
      return contactDetail;
    } catch (error) {
      console.log(error);
    }
  }

  //update contact details of particular staff contact by id
  updateContactDetailsByID(contactID, cdID, parameter, value) {
    try {
      if (this.isAdmin)
        throw new Error("Contact details can only be updated by staffs!");
      if (!this.isActive) throw new Error("User does not exist..");
      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);

      // console.log(contactDetailToUpdate);
      let updatedContactDetail = staffContact.updateContactDetailsByID(
        cdID,
        parameter,
        value
      );

      return updatedContactDetail;
    } catch (error) {
      console.log(error);
    }
  }

  //delete contact detail by id via staff
  deleteStaffContactDetailByID(contactID, cdID) {
    try {
      if (this.isAdmin)
        throw new Error("Contact details can only be deleted by Staff...");
      if (!this.isActive)
        throw new Error("oops staff is already been deleted....");
      Contact.validateContactID(contactID);
      Contact_Details.validateDetailsID(cdID);

      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);

      staffContact.deleteStaffContactDetailByID(cdID);
      console.log(
        `contact detail with id ${cdID} of contact ID ${contactID} is deleted succesfully`
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
