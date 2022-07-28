const DB_NAME = "worddb";
const STORAGE_NAME = "words";
const DB_VERSION = 1;
let DB;

export default {
  async getDB() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening DB", e);

        reject("Error");
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        let db = e.target.result;
        db.createObjectStore(STORAGE_NAME, {
          autoIncrement: true,
          keyPath: "id",
        });
      };
    });
  },
  async deleteWord(id) {
    const db = await this.getDB();

    return new Promise((resolve, reject) => {
      const tr = db.transaction([STORAGE_NAME], "readwrite");
      tr.oncomplete = () => {
        resolve();
      };

      const store = tr.objectStore(STORAGE_NAME);
      store.delete(id);
    });
  },

  async getWords() {
    let db = await this.getDB();

    return new Promise((resolve) => {
      let tr = db.transaction([STORAGE_NAME], "readonly");
      tr.oncomplete = () => {
        resolve(words);
      };

      const store = tr.objectStore(STORAGE_NAME);
      let req = store.openCursor();
      let words = [];

      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          words.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },

  async saveWord(word) {
    let db = await this.getDB();

    return new Promise((resolve) => {
      let tr = db.transaction([STORAGE_NAME], "readwrite");
      tr.oncomplete = () => {
        resolve();
      };

      let store = tr.objectStore(STORAGE_NAME);
      store.put(word);
    });
  },
};
