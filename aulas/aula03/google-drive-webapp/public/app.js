import AppController from "./src/controller/appController.js";
import ConnectionManagerService from "./src/service/connectionManagerService.js";
import ViewManager from "./src/view/viewManager.js";
import DragAndDropManager from "./src/view/dragAndDropManager.js";

const API_URL = "https://localhost:3000";

const appController = new AppController({
  viewManager: new ViewManager(),
  dragAndDropManager: new DragAndDropManager(),
  connectionManagerService: new ConnectionManagerService({
    apiUrl: API_URL,
  }),
});

try {
  await appController.initialize();
} catch (error) {
  console.log("Error on app controller initialization: " + error.message);
}
