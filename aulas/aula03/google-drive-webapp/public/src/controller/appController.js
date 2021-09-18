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
    this.connectionManagerService.configureEvents({
      onProggres: this.onProgress.bind(this),
    });
    this.viewManager.updateStatus(0);

    await this.updateCurrentFiles();
  }

  async onProgress({ processedAlready, filename }) {
    console.debug({});
    const file = this.uploadingFiles.get(filename);
    const alreadyProcessed = Math.ceil((processedAlready / file.size) * 100);

    updateProgress(file, alreadyProcessed);

    if (alreadyProcessed < 98) return;

    return this.updateCurrentFiles();
  }

  async updateProgress(file, percent) {
    const uploadingFiles = this.uploadingFiles;
    file.percent = percent;

    const total = [...uploadingFiles.values()]
      .map(({ percent }) => percent ?? 0)
      .reduce((total, current) => total + current, 0);

    this.viewManager.updateStatus(total);
  }

  async onFileChange(files) {
    const requests = [];

    this.viewManager.openModal();
    this.viewManager.updateStatus(0);

    for (const file of files) {
      this.uploadingFiles.set(file.name, file);
      requests.push(this.connectionManagerService.uploadFile(file));
    }

    await Promise.all(requests);
    this.viewManager.updateStatus(100);

    setTimeout(() => {
      this.viewManager.closeModal();
    }, 1000);

    await this.updateCurrentFiles();
  }

  async updateCurrentFiles() {
    const files = await this.connectionManagerService.currentFiles();
    this.viewManager.updateCurrentFiles(files);
  }
}
// 46:21s
