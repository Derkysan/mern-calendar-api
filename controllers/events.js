const event = require('../models/event');
const Event = require('../models/event');

// create events
const createEvent = async(req, res) => {

  const newEvent = new Event( req.body );

  try {

    newEvent.user = req.uid;
    await newEvent.save()

    res.status(201).json({
      ok: true,
      newEvent
    })
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'There was an error, contact the administrator'
    })
  }

};

// get events
const getEvents = async (req, res) => {

  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  })
};

// update events
const updateEvent = async(req, res) => {

  const eventID = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'the event ID does not exist'
      })
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have privileges to update the event'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate( eventID, newEvent, { new: true } );

    res.json({
      ok: true,
      event: eventUpdated
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'There was an error, contact the administrator'
    })
  }
  
};

// delete events
const deleteEvent = async (req, res) => {
  
  const eventID = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'the event ID does not exist'
      })
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have privileges to delete this event'
      })
    }

    await Event.findByIdAndDelete( eventID );

    res.json({
      ok: true,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'There was an error, contact the administrator'
    })
  }
  
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}