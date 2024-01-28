const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const Contact = require("../models");

const getAllContacts = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactsById = await Contact.findById(id);
  if (!contactsById) {
    throw HttpError(404);
  }
  res.status(200).json(contactsById);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(404);
  }
  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const changeContact = await Contact.findByIdAndUpdate(id, req.body);
  if (!changeContact) {
    throw HttpError(404);
  }
  res.status(200).json(changeContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updateStatusContact = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true }
  );

  if (!updateStatusContact) {
    throw HttpError(404);
  }

  res.status(200).json(updateStatusContact);
};

module.exports = updateFavorite;

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),

  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
