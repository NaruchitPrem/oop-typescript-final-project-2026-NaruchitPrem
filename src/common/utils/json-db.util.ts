import * as fs from 'fs';
import * as path from 'path';

export class JsonDB<T> {
  private readonly filePath: string;

  constructor(filename: string) {
    this.filePath = path.join(process.cwd(), 'data', `${filename}.json`);
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  read(): T[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      if (!data.trim()) {
        return [];
      }
      return JSON.parse(data) as T[];
    } catch (error) {
      return [];
    }
  }

  write(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}