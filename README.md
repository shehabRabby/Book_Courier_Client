# 📚 BookCourier – Library-to-Home Delivery System 🚀

## Project Overview

BookCourier is a full-stack, comprehensive library delivery management system designed to connect readers, students, and researchers with their nearby libraries. It facilitates seamless book borrowing and returning processes, eliminating the need for physical library visits. This system is built to enhance accessibility, convenience, and efficiency in book management and delivery.

--

## 🌐 Live Access and Repositories

| Item | Details |
| :--- | :--- |
| **Live Site URL** | [https://bookcouriernew.netlify.app/](https://bookcouriernew.netlify.app/) |
| **Client-Side Repository** | [https://github.com/shehabRabby/Book_Courier_Client](https://github.com/shehabRabby/Book_Courier_Client) |
| **Server-Side Repository** | [https://github.com/shehabRabby/Book_Courier_Server](https://github.com/shehabRabby/Book_Courier_Server) |
--

## ✨ Key Features

This project includes a wide range of features structured around three distinct user roles: **User**, **Librarian**, and **Admin**.

### General Features
* **Secure Authentication:** Email/Password login and one social login (e.g., Google).
* **Strong Password Validation:** Enforced during user registration.
* **Private/Protected Routes:** Securely managed using **JWT Token** verification on the server side.
* **Responsive Design:** Full responsiveness across mobile, tablet, and desktop devices.
* **Theme Toggle:** Integrated Light/Dark mode functionality.
* **Interactive UI:** Includes at least one **animated section** and well-designed landing page sections.

### User Features
* **Book Ordering:** Users can request a book delivery via a modal form on the book details page.
* **My Orders:** View a table of all ordered books with their status (**Pending**, **Shipped**, **Delivered**, **Cancelled**).
* **Order Management:**
    * **Cancel Order:** Ability to cancel only *pending* orders.
    * **Payment:** Dedicated **Pay Now** button for pending orders, leading to a payment page.
* **My Wishlist (Challenge):** Users can add and view a list of books they wish to order later.
* **Review/Rating (Challenge):** Users can submit reviews and ratings for books they have ordered.
* **Search & Sort (Challenge):** On the All Books page, users can search by book name and sort by price.
* **Invoices:** A dedicated page to view payment history with Payment ID, Amount, and Date.
* **My Profile:** View and update user name and profile image.

### Librarian Features
* **Add Book:** Dedicated form to add new books, including status (**Published**/Unpublished).
* **My Books:** Table view of all books added by the librarian, with an option to edit/unpublish. Books cannot be deleted by the librarian.
* **Orders Management:** View all orders for the books they added.
    * **Cancel Order:** Ability to cancel user orders.
    * **Status Update:** Ability to change an order's status from **Pending** $\rightarrow$ **Shipped** $\rightarrow$ **Delivered**.

### Admin Features
* **All Users:** View all registered users and assign roles (**Make Librarian**, **Make Admin**).
* **Manage Books:** View all books added by all librarians.
    * **Control:** Ability to **Publish/Unpublish** any book.
    * **Deletion:** Ability to **Delete** a book (which also cascades to delete all associated orders).
* **My Profile:** Same profile view/update functionality as the User dashboard.

---

## 🛠️ Technologies Used

| Category | Client-Side | Server-Side | Database & Deployment |
| :--- | :--- | :--- | :--- |
| **Key Technologies** | React.js, React Router DOM | Node.js, Express.js | MongoDB, Firebase Authentication |
| **Styling** | Tailwind CSS (with Dark/Light Theme support) | - | - |
| **Data Fetching (Optional)** | TanStack Query (for caching and revalidation) | - | - |
| **Authentication** | Firebase | JSON Web Tokens (JWT) | - |
| **Deployment** | Vercel / Netlify | Vercel / Render | - |

### NPM Packages Used

The following are some of the key packages utilized across the client and server:

| Client-Side Packages | Server-Side Packages |
| :--- | :--- |
| `react-router-dom` | `express` |
| `firebase` | `mongodb` |
| `react-icons` | `cors` |
| `axios` | `dotenv` |
| `react-hook-form` | `jsonwebtoken` |
| `swiper` | `stripe` |
| `react-simple-maps` | |
| `react-toastify` | |
| `react-tooltip` | |
| `react-query` / `tanstack-query` (Optional) | |

---


### Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `ph.team12@gmail.com` | `ph.team12@gmail.com` |
| **Librarian** | `capsule12@gmail.com` | `capsule12@gmail.com` |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm or yarn

### Installation (Client)

1.  Clone the client repository:
    ```bash
    git clone [https://github.com/shehabRabby/Book_Courier_Client.git](https://github.com/shehabRabby/Book_Courier_Client.git)
    cd Book_Courier_Client
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env.local` file in the root directory and securely configure your Firebase keys:
    ```env
    # .env.local (Example)
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_SERVER_URL=http://localhost:5000 # Use your local or deployed server URL
    ```
4.  Run the application:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Installation (Server)

1.  Clone the server repository:
    ```bash
    git clone [https://github.com/shehabRabby/Book_Courier_Server.git](https://github.com/shehabRabby/Book_Courier_Server.git)
    cd Book_Courier_Server
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env` file in the root directory and securely configure your credentials:
    ```env
    # .env (Example)
    DB_USER=your_mongo_user
    DB_PASS=your_mongo_password
    ACCESS_TOKEN_SECRET=your_jwt_secret
    PORT=5000
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```
4.  Run the server:
    ```bash
    npm start
    # or
    yarn start
    ```
---

## 🎨 Design & UI Philosophy

The design adheres to a **clean, recruiter-encouraging aesthetic** with a focus on:

* **Color Contrast:** A visually pleasing and accessible color palette.
* **Alignment & Spacing:** Strict adherence to grid layouts, balanced white space, and uniform element sizing (cards, images).
* **Consistency:** Consistent heading styles, button styles, and overall component look across the entire application.
* **Dashboard:** Features a collapsible sidebar, a consistent color theme, and includes charts/graphs for quick data visualization (as required).
* **Modernity:** Utilizes the new **X logo** for social links, keeping the design current.

---

## ✅ Deployment Checklist Confirmation

The deployment process was meticulously handled to ensure maximum stability and zero-error performance:

* **Server Stability:** The server is functioning perfectly in production, free of CORS, 404, or 504 errors.
* **Live Link Integrity:** The live site loads correctly on the landing page without showing any errors.
* **Route Reload Safety:** Pages **do not throw errors on reloading from any routes**.
* **Firebase Authorization:** The domain has been properly added to Firebase authorized domains.
* **Authentication Persistence:** **Logged-in users are not redirected to the Login page** when reloading any private route.