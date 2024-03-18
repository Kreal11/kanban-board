import axios from "axios";

export const kanbanApi = axios.create({
  baseURL: "https://kanban-board-zsgc.onrender.com/",
});
