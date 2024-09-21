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
console.log(admin1.updateUserByID(2, "firstName", "Vihaan"));
console.log("----------------------------------------");
admin1.deleteUserByID(3);
console.log(User.getAllStaff());
console.log("-------------------------------------------------");
console.log("staff1 contact details : ");
console.log("----------------------------------------------------");
staff1.newContact("sohil", "sheikh");
staff1.newContact("anish", "mondal");
staff1.newContact("kyle", "walker");

console.log(staff1);

console.log("--------------------------------------------");
console.log(`${staff1.getUserFirstName()} contact with id 2 is : `);
console.log(staff1.getContactByID(2));
