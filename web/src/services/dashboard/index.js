import request from "util/request";

export const loadDashData = () => request.get("/topicos");
