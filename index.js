const contacts = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = contacts.addContact(name, email, phone);
      console.log(newContact);
      if (!newContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(newContact);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);

// invokeAction({ action: "list" });

// invokeAction({ action: "get", id: "1" });

// invokeAction({
//   action: "add",
//   name: "Oleh Ivanytskyi",
//   email: "ivanytskyi2407@gmail.com",
//   phone: "+380676766950",
// });
// invokeAction({ action: "remove", id: "1" });
