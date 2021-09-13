export default class AppController {
  constructor({ connectionManagerService, viewManager }) {
    this.connectionManagerService = connectionManagerService;
    this.viewManager = viewManager;
  }

  async initialize() {
    this.viewManager.configureFileBtnClick();
    this.viewManager.configureOnFileChange(this.onFileChange.bind(this));
    this.connectionManagerService.configureEvents(() => {});

    await this.updateCurrentFiles();
  }

  async onFileChange(files) {
    debugger;
  }

  async updateCurrentFiles() {
    const files = await this.connectionManagerService.currentFiles();
    this.viewManager.updateCurrentFiles(files);
  }
}
