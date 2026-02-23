import * as fs from 'fs';
import * as path from 'path';

export class JsonDB<T> {
  private readonly filePath: string;

  constructor(filename: string) {
    // กำหนดให้ไฟล์ JSON ไปสร้างที่โฟลเดอร์ data/ ที่ root ของโปรเจกต์
    this.filePath = path.join(process.cwd(), 'data', `${filename}.json`);
    this.ensureFileExists();
  }

  // สร้างไฟล์ถ้ายังไม่มีไฟล์นั้นอยู่
  private ensureFileExists(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
    }
  }

  // ดึงข้อมูลทั้งหมด
  read(): T[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      // ถ้าไฟล์ว่างหรือมีแค่ whitespace ให้ return array ว่าง
      if (!data.trim()) {
        return [];
      }
      return JSON.parse(data) as T[]; // แคสต์ไทป์เป็น <T> ทันที เพื่อเลี่ยง any
    } catch (error) {
      // ถ้า JSON parse error หรือไฟล์เสียหาย ให้ return array ว่างแทนที่จะ throw error
      return [];
    }
  }

  // บันทึกข้อมูลทับลงไป
  write(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}