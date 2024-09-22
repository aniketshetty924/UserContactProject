class Contact_Details {
  //id,type->home,work,email
  constructor(contactDetailsID, numberType, emailType) {
    this.contactDetailsID = contactDetailsID;
    this.numberType = numberType;
    this.emailType = emailType;
  }
  static validateDetailsID(cdID) {
    try {
      if (cdID < 0) throw new Error("invalid contact detail ID");
      if (cdID >= 2) throw new Error("invalid contact detail id");
    } catch (error) {
      throw error;
    }
  }
  static newContactDetails(contactDetailsID, numberType, emailType) {
    try {
      if (typeof numberType != "object") throw new Error("invalid numberType");
      if (typeof emailType != "object") throw new Error("invalid email type!");
      let cdID = contactDetailsID;
      let tempContactDetails = new Contact_Details(cdID, numberType, emailType);
      return tempContactDetails;
    } catch (error) {
      throw error;
    }
  }

  static getContactDetailsByID(cdID, allContactDetails) {
    try {
      Contact_Details.validateDetailsID(cdID);
      for (let cDetail of allContactDetails) {
        if (cDetail.contactDetailsID == cdID) {
          return cDetail;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  //update contact details of particular staff contact by id
  static updateContactDetailsByID(
    cdID,
    contactDetailToUpdate,
    parameter,
    value
  ) {
    try {
      Contact_Details.validateDetailsID(cdID);
      switch (parameter) {
        case "numberType":
          contactDetailToUpdate.updateNumberType(value);
          break;

        case "emailType":
          contactDetailToUpdate.updateEmailType(value);
          break;

        default:
          throw new Error("Enter a valid parameter to change...");
      }

      return contactDetailToUpdate;
    } catch (error) {
      throw error;
    }
  }

  updateNumberType(numberType) {
    try {
      if (typeof numberType != "object")
        throw new Error("invalid parameter and value ....");
      this.numberType = numberType;
    } catch (error) {
      throw error;
    }
  }

  updateEmailType(emailType) {
    try {
      if (typeof emailType != "object")
        throw new Error("invalid parameter and value ....");
      this.emailType = emailType;
    } catch (error) {
      throw error;
    }
  }

  //delete contact detail by ID
  static deleteContactDetailsByID(cdID, allContactDetails) {
    try {
      Contact_Details.validateDetailsID(cdID);
      // for(let contactDetail of allContactDetails){
      //   if(contactDetail.contactDetailsID==cdID){

      //   }
      // }

      console.log("in deleted of cd...");
      console.log(allContactDetails);
      const indexOfFoundContactDetail = allContactDetails.findIndex((obj) => {
        return obj.contactDetailsID == cdID;
      });
      allContactDetails.splice(indexOfFoundContactDetail, 1);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contact_Details;
