export default class ConnectionManagerService {
  constructor({ apiUrl }) {
    this.apiUrl = apiUrl;
  }

  async currentFiles() {
    const apiContent = await fetch(this.apiUrl).catch((err) =>
      console.log("Error while trying to connect with API: " + err.message)
    );

    const files = await apiContent.json();

    return files;
  }
}
