const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

const contacts = require("./contacts");
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
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

// invokeAction({ action: "get", id: "10" });

// invokeAction({
//   action: "add",
//   name: "Oleh Ivanytskyi",
//   email: "ivanytskyi2407@gmail.com",
//   phone: "+380676766950",
// });

// invokeAction({ action: "remove", id: "1" });
