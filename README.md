# Kanban Board Project

## Getting Started

You can use the link on the Live page at the top right of this repository.

To run the project locally, follow these steps:

### Frontend

```bash
cd front-end
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

## Project Overview

### Hosting Platforms

The backend of this project is hosted on Render, while the frontend is deployed on Vercel.
The project uses a global MongoDB database through MongoDB Atlas.

***Important Note:*** The free version of Render has limitations. Consequently, when initially connecting, the server may take some time to wake up. If there are no requests made to the server for 15 minutes, it will enter a "sleep" state, and subsequent connections may also experience delays.

## Functionality

The project offers the following functionality:

- **Board Management:**
  - Ability to add, edit, and delete boards for managing tasks.
- **Task Management:**
  - Ability to add, edit, and delete tasks within a specific board.
- **Search Functionality:**
  - Search functionality to find task lists by board ID in the header. Board IDs are displayed on the boards for easy copying and pasting into the search form.
- **Board Structure:**
  - Each board consists of three columns: To Do, In Progress, and Done.
- **Drag and Drop:**
  - Drag and drop mechanism for tasks within a specific board.

## Technologies

The project utilizes the following technologies:

<div align='center'>
        <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" height=30>
        <img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" height=30>
        <img src="https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" height=30>
        <img src="https://img.shields.io/badge/-React_Router_Dom-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router Dom" height=30>
        <img src="https://img.shields.io/badge/-React_Hook_Form-FF6B6B?style=flat-square&logo=react&logoColor=white" alt="React Hook Form" height=30>
        <img src="https://img.shields.io/badge/-React_beautiful_dnd-FFD166?style=flat-square&logo=react&logoColor=white" alt="React-beautiful-dnd" height=30>
        <img src="https://img.shields.io/badge/-Node-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" height=30>
        <img src="https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" height=30>
        <img src="https://img.shields.io/badge/-Mongoose-47A248?style=flat-square&logo=mongoose&logoColor=white" alt="Mongoose" height=30>
        <img src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" height=30>
</div>

Made with 💙 by Kyrylo Shyrokov
