# supplyNest | Interview Preparation Guide (Accenture)

This document contains a comprehensive set of interview questions and talking points focused on the **supplyNest** project. It highlights technical decisions, architecture, and problem-solving scenarios encountered during development.

---

## 🚀 Project Overview
**supplyNest** is an enterprise-grade Supplier Onboarding Platform designed to streamline the registration, compliance review, and account activation process for sourcing teams. It bridges the gap between suppliers and procurement by providing a unified hub for document collection and verification.

### 🛠 Technology Stack
- **Frontend**: Next.js (React), TypeScript, Tailwind CSS, Shadcn UI.
- **Backend**: Spring Boot 3, Java 17, Spring Security, JPA/Hibernate.
- **Database**: PostgreSQL.
- **Security**: JWT (JSON Web Token) with stateless session management.

---

## 🧠 Core Features & Architecture

### 1. Unified Registration Flow
**Question**: How did you handle the complex supplier registration process?
**Answer**: I implemented a guided multi-step onboarding playbook. On the backend, I used a modular service architecture where the `SupplierService` handles data persistence and document metadata tracking, ensuring a clean separation of concerns.

### 2. Secure Authentication Shell
**Question**: How is the supplier dashboard protected?
**Answer**: I built an `AuthGuard` HOC (Higher-Order Component) in Next.js that checks for a valid JWT in `localStorage` before rendering protected routes. On the backend, Spring Security filters intercept requests to validate the token's signature and expiration.

### 3. Duplicate Resource Management
**Question**: How do you prevent duplicate supplier registrations?
**Answer**: I implemented a custom check for GST numbers. Before saving a new supplier, the `SupplierService` queries the `SupplierRepository` using `existsByGstNumber`. If a match is found, a `DuplicateResourceException` is thrown, which the `SupplierController` catches to return a `409 Conflict` status with a user-friendly message.

---

## 🛠 Technical Problem-Solving (Key Highlights)

### 1. Debugging JWT Base64 Errors
**Problem**: We encountered an "Illegal base64 character: '@'" error during token verification.
**Scenario**: The JWT secret contained special characters that the library tried to decode as a Base64 string by default.
**Solution**: I modified `JwtUtil` to use `Keys.hmacShaKeyFor` with the raw UTF-8 bytes of the secret password. This ensured the key was generated correctly regardless of special characters, following modern JJWT best practices.

### 2. Cross-Origin Resource Sharing (CORS)
**Problem**: The frontend (Next.js) could not communicate with the backend (Spring Boot) during local development.
**Solution**: I implemented a `WebConfig` class in Spring Boot that implements `WebMvcConfigurer`. I configured `addCorsMappings` to explicitly allow `http://localhost:3000` with appropriate methods (GET, POST, etc.) and allowed headers.

### 3. Database Seeding for Testing
**Scenario**: How do you ensure the system has demo data for testing?
**Solution**: I created a `DataSeeder` component using Spring Boot's `CommandLineRunner`. It automatically checks for the existence of a demo user (`supplier@example.com`) on startup and creates the necessary `Supplier`, `Role`, and `SupplierUser` entities if missing.

---

## 💼 Accenture-Specific Talking Points

### 1. Clean Code & Scalability
- "I focused on maintainability by using **DTOs** (Data Transfer Objects) for all API requests and responses, keeping the database models decoupled from the frontend requirements."
- "I used **SLF4J** for structured logging in `AuthService` and `AuthController` to ensure production-level observability."

### 2. User Experience (UX)
- "I translated a static dashboard mockup into a dynamic, responsive 'Supplier Panel' shell, using an **emerald-themed aesthetic** to provide a premium enterprise feel."
- "Implemented optimistic UI patterns and loading states in the login flow to enhance perceived performance."

### 3. Security Best Practices
- "Configured stateless JWT-based authentication to ensure backend scalability across multiple instances."
- "Included a robust backend validation layer to prevent duplicate data entries and ensure data integrity."

---

## 🌟 Quick Summary for the Interviewer
"supplyNest is not just a form builder; it's a compliance hub. During development, I successfully solved complex integration issues between the Next.js frontend and Spring Boot backend, including CORS handling and secure JWT implementation, while maintaining a focus on enterprise-grade aesthetics and clean code architecture."
