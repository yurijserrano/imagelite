<div align="center">
  <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/programming%20languages/typescript.svg" width="300" height="300" alt="Typescript-Logo"/>
  <img src="https://raw.githubusercontent.com/yurijserrano/Github-Profile-Readme-Logos/042e36c55d4d757621dedc4f03108213fbb57ec4/programming%20languages/java.svg" width="300" height="300" alt="Java-Logo"/>
</div>


# Imagelite

> 📷 imagelite: Upload and search images by tags and extensions. Built with Next.js and Spring Boot.

![Build Passing](https://img.shields.io/badge/build-passing-brightgreen) ![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen) ![Docker Version](https://img.shields.io/badge/docker-27.2.0-blue) [![LICENSE](https://img.shields.io/badge/license-MIT-blue)](https://github.com/yurijserrano/imagelite/blob/master/LICENSE.md)


## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Authentication Process](#authentication-process)
- [Image Upload Process](#image-upload-process)
- [Image Search Process](#image-search-process)
- [Image Download Process](#image-download-process)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



<a id="description"></a>

## 📖 Description 

**Imagelite** is a web application that allows users to upload and search images based on tags and extensions. The project is divided into two main parts: the backend and the frontend.

- **Backend (`imageliteapi`):** Developed with **Spring Boot**, the backend provides RESTful endpoints for user authentication, image uploads, and search functionalities. It uses **JWT (JSON Web Tokens)** for authentication, ensuring secure access to the application. Users can register, authenticate, and interact with images through the APIs.

- **Frontend (`imagelite`):** Built with **Next.js** and **TypeScript**, the frontend offers a user interface where users can authenticate, search for images, and upload new images. After logging in, users have access to features that allow them to manage and explore the stored images.



<a id="getting-started"></a>

## 🚀 Getting Started

### 📋 Prerequisites

- **Docker** installed on your machine. [Download Docker](https://www.docker.com/get-started)

### 🐳 Starting the Application with Docker

To start the application using Docker, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yurijserrano/imagelite.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd imagelite
   ```

3. **Run the Docker Compose file:**

   ```bash
   docker-compose up
   ```

   This command will build and start both the backend and frontend services.

#### 🎥 Video

https://github.com/user-attachments/assets/53ad233b-25a1-4d64-992b-6856a3a7c5c6

*Above you can watch the video showing how to start the application using Docker.*


<a id="authentication-process"></a>

## 🔐 Authentication Process

Users need to authenticate to access the application's features. Follow these steps:

1. **Access the application in your browser:**

   ```
   http://localhost:3000
   ```

2. **Register a new account or log in:**

   - **Registration:**
     - Click on the **Sign Up** button.
     - Fill in your details and submit.
   - **Login:**
     - Enter your credentials in the login form.
     - Click **Sign In** to proceed.

#### 🎥 Video

https://github.com/user-attachments/assets/edc7f9aa-42bb-4572-8806-6c2cca3f7748


*Above you can watch the video showing the authentication process.*


<a id="image-upload-process"></a>

## 🖼️ Image Upload Process

After logging in, you can upload images:

1. **Navigate to the Gallery Page:**

   - Click on the **Add image** button.

2. **Upload an Image:**

   - Enter the **name** of your image.
   - Add relevant **tags** to describe your image.
   - Click the **Click to upload** button and select your image.
   - Click the **Save** button to save the image.

#### 🎥 Video

https://github.com/user-attachments/assets/3d07a694-7c37-49ad-8e0a-f7e8a171289d


*Above you can watch the video showing how to upload images.*


<a id="image-search-process"></a>

## 🔎 Image Search Process

Search for images using tags or extensions:

1. **Access the Gallery Page**

2. **Search for Images:**

   - Enter a **tag** in the search bar or select an **extension** from the dropdown menu.
   - Click the **Search** button to view results matching your criteria.

#### 🎥 Video

https://github.com/user-attachments/assets/c94bce11-a9bb-4f2b-aa53-fc9cd4d1f0be


*Above you can watch the video showing how to search for images.*


<a id="image-download-process"></a>

## 💾 Image Download Process

The **Imagelite** application allows users to download images by simply hovering over an image and clicking on the **Download Image** button that appears.

### How It Works

1. **Hover Over an Image**: When a user moves the mouse over an image in the application, a **Download Image** button will appear.

2. **Click to Download**: By clicking this button, the image will be automatically downloaded to the user's device in its original format.

### Key Details

- **Supported Formats**: The download feature supports all image formats that can be uploaded to the application (e.g., JPEG, PNG).
- **Original Quality**: The image will be downloaded in its original quality without any compression or alteration.

### Usage Example

1. **Browse** or **Search for Images** in the application.
2. **Hover** over an image you wish to download.
3. **Click on the Download Image button** that appears on hover.

This feature is useful for users who wish to quickly save images locally for offline access or for use in other applications.

#### 🎥 Video

https://github.com/user-attachments/assets/1c395813-6ffa-4de8-939d-20bd8c32df2d


*Above you can watch the video showing how to download images.*


<a id="dependencies"></a>

## 🛠️ Dependencies


### Backend Dependencies
- **Spring Boot 3.3.4**
  - spring-boot-starter-data-jpa
  - spring-boot-starter-web
  - spring-boot-starter-security
  - spring-boot-starter-test

- **Database**
  - PostgreSQL
  - H2 Database (runtime)

- **Security**
  - jjwt-api (0.12.6)
  - jjwt-impl
  - jjwt-jackson

- **Others**
  - Lombok
  - Java 17

### Frontend Dependencies
- **Core**
  - Next.js 14.2.13
  - React 18
  - TypeScript 5

- **UI & Styling**
  - Tailwind CSS 3.4.1
  - Lucide React 0.453.0
  - @tailwindcss/aspect-ratio

- **Forms & Validation**
  - Formik 2.4.6
  - Yup 1.4.0

- **Authentication**
  - jwt-decode 4.0.0

- **Notifications**
  - react-toastify 10.0.5


<a id="contributing"></a>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**

2. **Create your feature branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a pull request.**


<a id="license"></a>


## ⚖️ License

[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](https://github.com/yurijserrano/imagelite/blob/master/LICENSE.md)

This project is licensed under the **MIT License**. See the [LICENSE.md](https://github.com/yurijserrano/imagelite/blob/master/LICENSE.md) file for details.


<a id="contact"></a>

## 📬 Contact

If you have any questions, feel free to reach out:

- **Email:** yurijserrano@gmail.com
- **LinkedIn:** [Yuri Serrano](https://www.linkedin.com/in/yurijserrano/)
- **GitHub:** [yurijserrano](https://github.com/yurijserrano)