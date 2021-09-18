export default class AppController {
  constructor({ connectionManagerService, viewManager }) {
    this.connectionManagerService = connectionManagerService;
    this.viewManager = viewManager;
    this.uploadingFiles = new Map();
  }

  async initialize() {
    this.viewManager.configureFileBtnClick();
    this.viewManager.configureModal();
    this.viewManager.configureOnFileChange(this.onFileChange.bind(this));
    this.connectionManagerService.configureEvents(() => {});

    this.viewManager.openModal();
    setTimeout(() => {
      this.viewManager.closeModal();
    }, 2000);

    await this.updateCurrentFiles();
  }

  async onFileChange(files) {
    const requests = [];
    for (const file of files) {
      this.uploadingFiles.set(file.name, file);
      requests.push(this.connectionManagerService.uploadFile(file));
    }

    await Promise.all(requests);

    await this.updateCurrentFiles();
  }

  async updateCurrentFiles() {
    const files = await this.connectionManagerService.currentFiles();
    this.viewManager.updateCurrentFiles(files);
  }
}
// 46:21s
