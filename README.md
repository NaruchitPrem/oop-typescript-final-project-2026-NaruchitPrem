# NestJS Backend API — Project Template

## 📌 Project Overview

โปรเจคนี้เป็นระบบ Backend REST API สำหรับ **ระบบจัดการกิจกรรม (Event Management System)** พัฒนาด้วย NestJS Framework และ TypeScript โดยเป็นส่วนหนึ่งของ Final Project (Model Set 3)

ระบบนี้ประกอบด้วย 3 ส่วนหลัก ได้แก่:
1. **Events Management:** ระบบจัดการกิจกรรม (สร้าง, แก้ไข, ลบ, ดูข้อมูลกิจกรรม)
2. **Participants Management:** ระบบจัดการผู้ใช้งานและสมาชิก (สมัครสมาชิก, เข้าสู่ระบบ, อัปเดตข้อมูล, ดูข้อมูลผู้ใช้งานทั้งหมด)
3. **Reservations System:** ระบบการจองกิจกรรม (จอง, ยกเลิกการจอง, ดูประวัติการจอง)

ระบบใช้การจำลองฐานข้อมูลด้วยไฟล์ JSON (JSON-based Database) และมีการเขียนเอกสาร API ด้วย Swagger

---

## 👥 Team & Contributors

* นฤชิต เชิงหอม	     68010578
* ทินภัทร ศิวกรตรัยคุณ	68010417
* ธนภัทร ฉิมบรรเทิง	   68010468

---

## 🛠 Technology Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **API Style:** REST API
* **Database:** JSON-based (file-based หรือ in-memory)
* **API Documentation:** Swagger (OpenAPI)
* **Linting:** ESLint (TypeScript ESLint)
* **Validation:** `class-validator` และ `class-transformer`

---

## 🚀 การติดตั้งและรันโปรเจค

 1. ติดตั้ง Dependencies
เปิด Terminal แล้วรันคำสั่ง:
```bash
npm install
```
 2. รัน Development Server
```bash
npm run start:dev
```
 3. ดู API Documentation (Swagger)
เมื่อ Server ทำงานแล้ว สามารถเข้าไปทดสอบ API ทั้งหมดได้ที่เว็บเบราว์เซอร์:
http://localhost:3000/api

---

## 📁 Project Structure

```text
.
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── modules/
|   |   ├──events/
|   |   |   └──dto/
|   |   ├──participants/
|   |   |   └──dto/
│   │   └── reservations/
│   │       └── dto/
│   │
│   └── common/
│       ├── enums/
│       ├── interfaces/
│       └── utils/
│
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 ลิงก์ไปยังเอกสารทางเทคนิค (Documentation)
สามารถดูเอกสารการออกแบบและรายละเอียดเชิงลึกของระบบได้ที่โฟลเดอร์ `docs/`:

* 🔌 [API Specification](./docs/api-specification.md) - รายละเอียดของ Endpoint ทั้งหมด
* 🧱 [Data Model Documentation](./docs/data-model.md) - คำอธิบายและโครงสร้างของฐานข้อมูล
* 📊 [UML Diagram](./docs/uml-diagram.png) - แผนภาพความสัมพันธ์ของระบบ

---