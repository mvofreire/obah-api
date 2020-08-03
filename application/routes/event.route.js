import EventController from "../controllers/event.controller";

export const EventRoute = app => {
  app
    .route("/event")
    .post(EventController.createEvent)
    .get(EventController.loadMyEvents);

  app
    .route("/event/:id")
    .get(EventController.detailEvent)
    .delete(EventController.removeEvent);
};
