const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join(__dirname, "/db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
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
  updateContacts(contacts);
  return contacts;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newList = contacts.filter((item) => item.id !== contactId);
  if (!newList) {
    return null;
  }
  console.log(newList);
  updateContacts(newList);
  return newList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  console.log(contactById);
  return contactById;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
