import fs from 'fs';

export class JsonHelper {
    static readJson<T = Record<string, unknown>>(filePath: string): T {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
    }
}