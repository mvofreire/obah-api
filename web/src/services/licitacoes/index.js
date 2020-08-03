import request from "util/request";

export const addLicitacao = data => request.post("/licitacoes", data);

export const loadLicitacoes = (filters, page = 1, limit = 10) =>
  request.get("/licitacoes", { filters, page, limit });

export const loadLicitacao = id => request.get(`/licitacoes/${id}`);
