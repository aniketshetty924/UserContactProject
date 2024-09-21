const Contact = require("./contact/contact.js");

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
    return this.contacts;
  }
  static getAllAdmin() {
    return User.#allAdmin;
  }
  static getAllStaff() {
    return User.#allStaff;
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
  static getUserByID(ID, isAdmin) {
    try {
      if (!isNaN(ID)) throw new Error("invalid ID...");
      if (isAdmin) {
        let allAdmins = User.#allAdmin;
        for (let admin of allAdmins) {
          if (admin.#userID == ID) {
            return admin;
          }
        }
      } else {
        let allStaffs = User.#allStaff;
        for (let staff of allStaffs) {
          if (staff.#userID == ID) {
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
      return this.getUserByID(userID, true);
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
      foundStaff.isActive = false;
      let allStaffs = User.#allStaff;

      const indexOfFoundStaff = allStaffs.findIndex((obj) => {
        return obj.#userID == staffID;
      });
      allStaffs.splice(indexOfFoundStaff, 1);
      console.log(`Student with staff ID ${staffID} is deleted...`);
    } catch (error) {
      console.log(error);
    }
  }

  //creating contact object for particular staff object
  newContact(firstName, lastName) {
    try {
      if (this.isAdmin) throw new Error("Only staffs can create contacts...");
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
      Contact.validateContactID(contactID);
      let allContacts = this.contacts;
      let staffContact = Contact.getContactByID(contactID, allContacts);
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
      User.validateContactID(contactID);
      if (typeof parameter != "string") throw new Error("Invalid parameter");
      if (typeof value != "string") throw new Error("invalid value");
      let allContacts = this.contacts;
      let staffContactToUpdate = Contact.getContactByID(contactID, allContacts);
      let updatedStaffContact = Contact.updateStaffContactByID(
        contactID,
        parameter,
        value,
        staffContact
      );

      return staffContact;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
