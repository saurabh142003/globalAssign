# EmployWise Frontend Assignment

## 📌 Project Overview
This React application integrates with the Reqres API to perform user management functions, including authentication, listing users, and managing user data (edit, delete, update). 

## 🚀 Features
### Level 1: Authentication
- Login using the provided credentials:
  - **Email**: `eve.holt@reqres.in`
  - **Password**: `cityslicka`
- Successful login stores the token and redirects to the user list page.

### Level 2: User Listing
- Displays a paginated list of users fetched from `GET /api/users?page=1`.
- Shows user details including **first name, last name, and avatar**.
- Supports pagination.

### Level 3: User Management
- **Edit User**: Allows updating user details via `PUT /api/users/{id}`.
- **Delete User**: Removes a user using `DELETE /api/users/{id}`.
- Displays success or error messages for each action.

## 🛠️ Technologies Used
- **React.js** (Frontend framework)
- **Axios** API (for HTTP requests)
- **React Router** (for navigation)
- **LocalStorage** (for token persistence)
- **CSS Framework**: Tailwind CSS

## 📷 Screenshots
### Login Page
![Login Page](https://github.com/saurabh142003/globalAssign/blob/main/images/Screenshot%202025-03-28%20210547.png?raw=true)

### User List Page
![User List](https://github.com/saurabh142003/globalAssign/blob/main/images/Screenshot%202025-03-28%20210020.png?raw=true)

### Edit User Modal
![Edit User](https://github.com/saurabh142003/globalAssign/blob/main/images/Screenshot%202025-03-28%20211628.png?raw=true)

### Responsive Design
![Responsive Design](https://github.com/saurabh142003/globalAssign/blob/main/images/Screenshot%202025-03-28%20210109.png?raw=true)

## 🔧 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/saurabh142003/globalAssign.git
cd employwise-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Open `http://localhost:5173` in your browser.

## 📜 API Endpoints Used
- **POST** `/api/login` – Authenticate user
- **GET** `/api/users?page=1` – Fetch users list
- **PUT** `/api/users/{id}` – Update user details
- **DELETE** `/api/users/{id}` – Delete a user

## 📌 Deployment

👉 [Live Demo](https://usersretrieve.netlify.app/)

## 📜 Guidelines & Assumptions
- Token is stored in `localStorage` and used for authentication.
- API errors are handled with appropriate messages.
- Responsive design ensures mobile-friendliness.

