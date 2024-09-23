const User = require("./user/user.js");

let admin1 = User.newAdmin("Aniket", "Shetty");
console.log("Admin : ");
console.log(admin1);

let staff1 = admin1.newStaff("Rahul", "Kumar");
let staff2 = admin1.newStaff("rajesh", "shetty");
let staff3 = admin1.newStaff("Rohit", "Sharma");
let staff4 = admin1.newStaff("Aneesh", "Singh");
console.log(
  "-------------------------------------------------------------------------"
);
console.log("Staffs : ");
console.log(User.getAllStaff());
console.log(
  "--------------------------------------------------------------------"
);

console.log(
  `${admin1.getUserFirstName()}   id : ${admin1.getUserID()} -----ADMIN`
);
console.log(
  `${staff1.getUserFirstName()}   id : ${staff1.getUserID()} -----Staff`
);
console.log(
  `${staff2.getUserFirstName()}   id : ${staff2.getUserID()} -----Staff`
);
console.log(
  `${staff3.getUserFirstName()}   id : ${staff3.getUserID()} -----Staff`
);
console.log(
  `${staff4.getUserFirstName()}   id : ${staff4.getUserID()} -----Staff`
);

console.log("Total users : ", User.getAllUsersID());
console.log("-------------------------------------------------");
console.log(`Updating staff with id 2 by admin1 : ${admin1.firstName}`);
console.log(admin1.updateUserByID(2, "firstName", "Vihaan"));
console.log("----------------------------------------");
admin1.deleteUserByID(3);
console.log(User.getAllStaff());
console.log("------------------------------------------------------");
console.log(User.getUserByID(2));
console.log("-------------------------------------------------");
console.log(User.getAllStaff());
console.log("--------------------------------------------------------");
console.log("staff1 contact details : ");
console.log("----------------------------------------------------");
staff1.newContact("sohil", "sheikh");
staff1.newContact("anish", "mondal");
staff1.newContact("kyle", "walker");

console.log(staff1);

console.log("--------------------------------------------");
console.log(`${staff1.getUserFirstName()} contact with id 2 is : `);
console.log(staff1.getContactByID(2));
console.log("--------------------------------------------");
console.log("Updated staff contact :");
console.log(staff1.updateStaffContactByID(2, "firstName", "John"));
console.log(staff1.updateStaffContactByID(2, "lastName", "Cena"));

staff1.newContactDetails(
  2,
  { homeNumber: "9987751759" },
  { personalEmail: "john@123" }
);
staff1.newContactDetails(
  2,
  { officeNumber: "9874538324" },
  { officeEmail: "cena@123" }
);

console.log("-----------------------------------------");
console.log(staff1.getContactByID(2));
console.log("-------------------------------------");
console.log(JSON.stringify(staff1.getContactByID(2), null, 2));
console.log("--------------------------------------");
console.log(JSON.stringify(staff1, null, 2));

console.log("***************************************");
console.log("final..");
console.log(staff1.getContactDetailsByID(2, 1));

console.log("---------------------------------------------");
console.log("Now deleting one contact from staff1");
staff1.deleteStaffContactByID(0);
console.log(staff1.getUserContacts());
console.log("---------------------------------------------");
console.log("now update...");
console.log(
  staff1.updateContactDetailsByID(2, 1, "emailType", {
    officeEmail: "johncena@12345",
  })
);
console.log("********************************************");
console.log("updated contact detail of john cena");
console.log(JSON.stringify(staff1, null, 2));
console.log(staff1.getContactByID(2, 1));

console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
console.log("NOw deleting contact detail 0 of staff1 contact 2");
staff1.deleteStaffContactDetailByID(2, 0);
console.log(JSON.stringify(staff1, null, 2));

console.log(staff1.getContactByID(2));

console.log("-------------------------");
console.log(staff1.getContactDetailsByID(2, 1));
