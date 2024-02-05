const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const schema = require("../schemas/contactsSchemas");
const { authenticate } = require("../middelwares");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.getAllContacts);

contactsRouter.get("/:id", authenticate, ctrl.getContactById);

contactsRouter.delete("/:id", authenticate, ctrl.deleteContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(schema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schema.favoriteSchema),
  ctrl.updateFavorite
);

module.exports = contactsRouter;
