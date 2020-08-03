import { Event } from "models";

const createEvent = async (req, res) => {
  try {
    const { userSession } = req.appContext;
    const data = req.body;
    const event = await Event.create({
      ...data,
      user_id: userSession.id
    });

    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar Evento");
  }
};

const detailEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (event !== null) {
      res.json(event);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao carregar Evento");
  }
};

const loadMyEvents = async (req, res) => {
  try {
    const { userSession } = req.appContext;
    const events = await Event.findAll({ where: { user_id: userSession.id } });

    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar Evento");
  }
};

const removeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (event != null) {
      event.destroy();
      res.json(true);
    } else {
      res.status(404).send("Evento não encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao remover Evento");
  }
};

export default {
  createEvent,
  loadMyEvents,
  detailEvent,
  removeEvent
};
