export default class ConnectionManagerService {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;

    this.ioClient = io.connect(apiUrl, { withCredentials: false });
    this.socketId = "";
  }

  configureEvents({ onProgress }) {
    this.ioClient.on("Connect", this.onConnect.bind(this));
    this.ioClient.on("file-upload", onProgress);
  }

  onConnect(msg) {
    console.log("Connected!", this.ioClient.id, msg);
    this.socketId = this.ioClient.id;
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append("files", file);

    const response = await fetch(`${this.apiUrl}?socketId=${this.socketId}`, {
      method: "POST",
      body: formData,
    });
  }

  async currentFiles() {
    const apiContent = await fetch(this.apiUrl).catch((err) =>
      console.log("Error while trying to connect with API: " + err.message)
    );

    const files = await apiContent.json();

    return files;
  }
}
