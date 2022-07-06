const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newList = contacts.filter((item) => item.id !== contactId);
  console.log(newList);
  fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  contacts.push({
    id: v4(),
    name,
    email,
    phone,
  });
  console.table(contacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
