const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const allContacts = await contactsService.listContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactsById = await contactsService.getContactById(id);
  if (!contactsById) {
    throw HttpError(404);
  }
  res.status(200).json(contactsById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await contactsService.removeContact(id);
  if (!removedContact) {
    throw HttpError(404);
  }
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const changeContact = await contactsService.updateContact(id, req.body);
  if (!changeContact) {
    throw HttpError(404);
  }
  res.status(200).json(changeContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
