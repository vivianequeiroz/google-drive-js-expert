export default class DragAndDropManager {
  constructor() {
    this.dropArea = document.getElementById("dropArea");
  }

  initialize() {
    this.disableDrangAndDropEvents();
  }

  disableDrangAndDropEvents() {
    const events = ["dragenter", "dragover", "dragleave", "drop"];

    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    events.forEach((eventName) => {
      this.dropArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
  }
}
