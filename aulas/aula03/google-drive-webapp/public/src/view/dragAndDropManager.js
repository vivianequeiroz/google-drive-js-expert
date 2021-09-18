export default class DragAndDropManager {
  constructor() {
    this.dropArea = document.getElementById("dropArea");
  }

  initialize() {
    this.disableDrangAndDropEvents();
    this.enableHighlightOnDrag();
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

  enableHighlightOnDrag() {
    const events = ["dragenter", "dragover"];
    const hightlight = (e) => {
      this.dropArea.classList.add("highlight");
      this.dropArea.classList.add("drop-area");
    };

    events.forEach((eventName) => {
      this.dropArea.addEventListener(eventName, hightlight, false);
    });
  }
}
