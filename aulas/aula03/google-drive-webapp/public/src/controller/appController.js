export default class AppController {
  constructor({ connectionManagerService, viewManager }) {
    this.connectionManagerService = connectionManagerService;
    this.viewManager = viewManager;
  }

  async initialize() {
    await this.updateCurrentFiles();
  }

  async updateCurrentFiles() {
    const files = await this.connectionManagerService.currentFiles();
    this.viewManager.updateCurrentFiles(files);
  }
}
