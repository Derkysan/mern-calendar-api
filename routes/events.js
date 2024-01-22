// host + /api/events

const { Router } = require('express');
const router = Router();

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validateJwt');
const { fieldsValidations } = require('../middlewares/fieldsValidation');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');


router.use( validateJWT )

// create event
router.post('/', [
  check('title', 'title is required').not().isEmpty(),
  check('start', 'start date is required').custom( isDate ),
  check('end', 'end date is required').custom( isDate ),
  fieldsValidations
], createEvent);

// get events
router.get('/', [], getEvents);

// update event
router.put('/:id', [
  check('title', 'title is required').not().isEmpty(),
  check('start', 'start date is required').custom( isDate ),
  check('end', 'end date is required').custom( isDate ),
  fieldsValidations
], updateEvent);

// delete event
router.delete('/:id', [], deleteEvent);

module.exports = router;