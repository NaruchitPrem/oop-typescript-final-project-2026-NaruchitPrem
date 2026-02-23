# Data Model Documentation

**Project Name:** Event Management System  
**Model Set:** 3  

เอกสารฉบับนี้อธิบายโครงสร้างข้อมูล (Data Model) ทั้งหมดที่ใช้ในระบบจัดการกิจกรรม (Event Management System) โดยแบ่งออกเป็น Enumerations สำหรับควบคุมสถานะ และ Interfaces สำหรับโครงสร้างข้อมูลหลัก

---

## 1. Enumerations (ประเภทข้อมูลแบบกำหนดค่าคงที่)

ระบบมีการใช้ Enum เพื่อควบคุมสถานะและบทบาทให้เป็นไปตามมาตรฐาน ป้องกันการกรอกข้อมูลผิดพลาด

### 1.1 `Role`
กำหนดบทบาทและสิทธิ์การเข้าถึงของผู้ใช้งาน
* `ADMIN`: ผู้ดูแลระบบ (จัดการกิจกรรม)
* `PARTICIPANT`: ผู้เข้าร่วม (จองกิจกรรม)

### 1.2 `EventStatus`
ระบุสถานะปัจจุบันของกิจกรรม
* `UPCOMING`: กำลังจะเกิดขึ้น
* `ONGOING`: กำลังดำเนินการ
* `COMPLETED`: เสร็จสิ้นแล้ว
* `CANCELLED`: ยกเลิก

### 1.3 `ReservationStatus`
ระบุสถานะการจองกิจกรรมของผู้เข้าร่วม
* `PENDING`: รอยืนยัน
* `CONFIRMED`: ยืนยันแล้ว
* `CANCELLED`: ยกเลิกการจอง

---

## 2. Core Models (โครงสร้างข้อมูลหลัก)

Core Model หลักของระบบตามโจทย์คือ **Event** และ **Participant** ซึ่งได้รับการออกแบบให้มี Attribute ไม่ต่ำกว่า 10 รายการตามข้อกำหนด

### 2.1 Event (กิจกรรม)
เก็บข้อมูลรายละเอียดของกิจกรรมต่างๆ ในระบบ *(รวม 11 Attributes)*

| Attribute | Type | Description | Category (Guideline) |
| :--- | :--- | :--- | :--- |
| `eventId` | `string` | รหัสอ้างอิงกิจกรรม (UUID) | Identity |
| `name` | `string` | ชื่อกิจกรรม | Core Domain |
| `description` | `string` | รายละเอียดและเนื้อหาของกิจกรรม | Core Domain |
| `startTime` | `Date` | วันและเวลาที่เริ่มต้นกิจกรรม | Core Domain |
| `endTime` | `Date` | วันและเวลาที่สิ้นสุดกิจกรรม | Core Domain |
| `location` | `string` | สถานที่จัดกิจกรรม | Core Domain |
| `capacity` | `number` | จำนวนผู้เข้าร่วมสูงสุดที่รับได้ | Core Domain |
| `currentBookings` | `number` | ยอดจำนวนผู้ที่ทำการจองกิจกรรมในปัจจุบัน | Core Domain |
| `status` | `EventStatus` | สถานะของกิจกรรม | Status / State |
| `createdAt` | `Date` | วันและเวลาที่สร้างข้อมูล | Timestamp |
| `updatedAt` | `Date` | วันและเวลาที่ข้อมูลถูกแก้ไขล่าสุด | Timestamp |

### 2.2 Participant (ผู้เข้าร่วมกิจกรรม)
เก็บข้อมูลของผู้ใช้งานที่สมัครเข้ามาเพื่อจองกิจกรรม โดยสืบทอดข้อมูลพื้นฐานมาจาก `User` *(รวม 10 Attributes)*

| Attribute | Type | Description | Category (Guideline) |
| :--- | :--- | :--- | :--- |
| `userId` | `string` | รหัสอ้างอิงผู้ใช้งาน (UUID) [สืบทอดจาก User] | Identity |
| `username` | `string` | ชื่อบัญชีผู้ใช้งานสำหรับเข้าสู่ระบบ [สืบทอดจาก User] | Core Domain |
| `password` | `string` | รหัสผ่าน [สืบทอดจาก User] | Core Domain |
| `email` | `string` | ที่อยู่อีเมล [สืบทอดจาก User] | Core Domain |
| `role` | `Role` | บทบาทของผู้ใช้งาน (`PARTICIPANT`) [สืบทอดจาก User] | Configuration |
| `firstName` | `string` | ชื่อจริง | Core Domain |
| `lastName` | `string` | นามสกุล | Core Domain |
| `phoneNumber` | `string` | เบอร์โทรศัพท์ติดต่อ | Core Domain |
| `isActive` | `boolean` | สถานะการใช้งานบัญชี (เปิด/ปิดการใช้งาน) | Flag |
| `createdAt` | `Date` | วันและเวลาที่ทำการสมัครสมาชิก | Timestamp |

---

## 3. Supporting Models (โครงสร้างข้อมูลสนับสนุน)

### 3.1 User (Abstract Model)
โครงสร้างพื้นฐานสำหรับผู้ใช้งานระบบทุกคน

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | รหัสผู้ใช้งาน (UUID) |
| `username` | `string` | ชื่อบัญชีผู้ใช้งาน |
| `password` | `string` | รหัสผ่าน |
| `email` | `string` | ที่อยู่อีเมล |
| `role` | `Role` | บทบาทของผู้ใช้งาน (`ADMIN` หรือ `PARTICIPANT`) |

### 3.2 Admin (ผู้ดูแลระบบ)
สืบทอดจาก `User` ใช้สำหรับผู้ที่มีสิทธิ์จัดการกิจกรรม

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `department` | `string` | แผนกหรือหน่วยงานที่สังกัด |

*(หมายเหตุ: แอตทริบิวต์อื่นๆ สืบทอดมาจาก `User` ทั้งหมด)*

### 3.3 Reservation (การจอง)
ข้อมูลธุรกรรมการจองกิจกรรม เชื่อมโยงระหว่าง `Participant` และ `Event`

| Attribute | Type | Description | Category |
| :--- | :--- | :--- | :--- |
| `reservationId` | `string` | รหัสอ้างอิงการจอง (UUID) | Identity |
| `userId` | `string` | รหัสผู้ใช้งานที่ทำการจอง | Relation (to Participant) |
| `eventId` | `string` | รหัสกิจกรรมที่ถูกจอง | Relation (to Event) |
| `reservationDate` | `Date` | วันและเวลาที่บันทึกการจอง | Timestamp |
| `status` | `ReservationStatus`| สถานะของการจอง (`CONFIRMED`, `CANCELLED` ฯลฯ) | Status / State |