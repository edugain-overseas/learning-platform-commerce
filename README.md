# Learning Platform Commerce

Frontend application for an online learning platform with commerce features, user profile management, payments, and rich interactive UI.

---

## 🚀 Tech Stack

**Core**

* React 18
* Create React App
* React Router v6
* Redux Toolkit + Redux Persist
* React Hook Form

**UI & UX**

* Ant Design (antd)
* Framer Motion (animations)
* Swiper (sliders)
* Sass (SCSS modules)
* React Spinners

**Forms & Inputs**

* react-hook-form
* react-phone-input-2
* use-mask-input

**Media & Content**

* react-pdf / pdfjs-dist
* react-quill-new (rich text editor)
* react-avatar-editor

**Drag & Drop / Tables**

* @dnd-kit (core, sortable, modifiers)
* react-dropzone
* xlsx (CSV / Excel import)

**Utilities**

* axios
* dayjs / moment
* country-list
* franc (language detection)
* react-countup

**Auth & Integrations**

* Apple Sign In

---

## ✨ Features

* User authentication & profile management
* Editable user information (phone, country, password, avatar)
* Course browsing & purchasing flow
* Commerce-ready architecture
* Custom reusable UI components (Select, Tooltip, Tables, etc.)
* Drag-and-drop data handling
* PDF rendering
* Responsive layout
* Smooth animations

---

## 📁 Project Structure

![Architecture diagram](images/architecture.png)

---

## 🧠 Architectural Notes

* Global state is managed with **Redux Toolkit**
* Persistent state via **redux-persist**
* Forms are handled with **react-hook-form** for performance and scalability
* UI components are designed to be reusable and isolated
* Complex logic (tables, drag & drop, timers) is extracted into custom hooks

---

## 🛠️ Scripts

```bash
npm start       # Run development server
npm run build   # Build for production
npm test        # Run tests
npm run eject   # Eject CRA configuration
```

---

## 🌍 Browser Support

Defined via `browserslist`:

* Modern evergreen browsers
* No support for legacy or dead browsers

---

## 📌 Notes

* This project is private and intended for internal or controlled use
* README structure is prepared for future expansion (architecture, diagrams, API docs)

---

## 📄 License

Private project. All rights reserved.
