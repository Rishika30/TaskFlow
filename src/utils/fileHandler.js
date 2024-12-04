const fs = require('fs').promises;
const path = require('path');

class FileHandler {
    constructor(filePath){
        this.filePath = path.resolve(filePath);
    }

    async ensureFileExists() {
        try {
            await fs.access(this.filePath);
        } catch (error) {
            await fs.mkdir(path.dirname(this.filePath), { recursive: true });
            await fs.writeFile(this.filePath, JSON.stringify([], null, 2));
        }
    }

    async readFile() {
        await this.ensureFileExists();
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async writeFile(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }
}

module.exports = FileHandler;