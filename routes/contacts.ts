import express from 'express'
import {
  addNewContact,
  deleteContact,
  getAllContacts,
  getSingleContact,
  updateContact,
} from '../controllers/contacts'

const router = express.Router()

router.get('/contacts/:id', getSingleContact)
router.get('/contacts', getAllContacts)
router.post('/contacts', addNewContact)
router.delete('/contacts/:id', deleteContact)
router.put('/contacts/', updateContact)

export = router
