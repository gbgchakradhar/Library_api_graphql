# Library Management System Backend (Apollo-GraphQL)

## Roles:
1. **Head Admin:**
   - Can perform all CRUD operations across all branches.

2. **Branch Admin:**
   - Admin of the current branch.
   - Can perform all CRUD operations within their branch.

3. **Librarian:**
   - Can read analytics of books and subjects.
   - Can perform CRUD operations on students.

4. **Student:**
   - Can view the number of books under each subject (count not visible).
   - Can avail a book to read in the library.

## Workflow:

1. **New User Registration:**
   - Email
   - Password
   - Username
   - Role
   - Branch (not mandatory)

2. **Existing User Login:**
   - Perform authorized operations based on the assigned role.

## Technical Flow:

1. **User Login:**
   - Upon login, the backend issues a JWT token.

2. **Middleware:**
   - Each request's middleware checks authentication for validity.

3. **Resolver Level:**
   - Authorization is checked before executing any operation.

This structure ensures secure and role-based access control in the library management system.
