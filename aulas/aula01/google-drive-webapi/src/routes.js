export default class Routes {
  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }
  
  handler(request, response) {
    response.end('Henlo world!');
  }
}