# EduInsights - Client Application

EduInsights is a **University Result Management System** designed to simplify academic performance tracking. This repository contains the **client-side** of the application, built with **React TypeScript**, **Redux**, and **Tailwind CSS**.

## Features

- User Authentication (JWT-based login, registration, email verification)
- Role-based access for **Super Admin, Admin, Data Entry, Lecturer, and Student**
- Dashboard with **GPA analytics** and **student performance tracking**
- Manage **users, results, and courses** dynamically
- Responsive and modern UI with **Tailwind CSS**

## Tech Stack

- **Frontend:** React, TypeScript, Redux, Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication:** JWT-based auth
- **API Communication:** Axios

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EduInsights-Org/EduInsights.Client.git
   cd EduInsights.Client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a **public/config.js** file in the root directory and configure environment variables:
   ```js
   window.config = {
     BACKEND_BASE_URL: "http://localhost:5269/api/v1",
     DEPLOYED_ENVIRONMENT: "development",
   };
   ```

4. Ensure `config.js` is loaded in `index.html`:
   ```html
   <script src="/config.js"></script>
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Build for Production

To generate a production-ready build:
```bash
npm run build
# or
yarn build
```

### Linting & Formatting

Ensure code quality with:
```bash
npm run lint
npm run format
```

## Folder Structure

```
EduInsights/client
│── src
│   ├── app/          # Application root setup
│   ├── assets/       # Static files (images, icons, etc.)
│   ├── components/   # Reusable UI components
│   ├── config/       # Configuration files
│   ├── context/      # React Context API providers
│   ├── hooks/        # Custom hooks
│   ├── layout/       # Layout components
│   ├── pages/        # Application pages (Register, Login, etc.)
│   ├── slices/       # Redux slices for state management
│   ├── utils/        # Utility functions
│   ├── views/        # UI view components
│── public/            # Static assets
│── public/config.js   # Configuration file for environment variables
│── package.json       # Dependencies & scripts
```

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
