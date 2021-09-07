import { logger } from "./logger.js";
export default class Routes {
  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end("Henlo world!");
  }

  async options(request, response) {
    response.writeHead(204);
    response.end();
  }

  async post(request, response) {
    logger.info("Post is ok =)");
    response.end();
  }

  async get(request, response) {
    logger.info("Get is ok =)");
    response.end();
  }

  handler(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;

    return chosen.apply(this, [request, response]);
  }
}
