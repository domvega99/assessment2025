# Assessment

Installation

```sh
npm install --legacy-peer-deps
```

## Run tasks

To run the dev server for your app, use:

```sh
nx serve api
```

To run the dev client for your app, use:

```sh
nx dev client
```

## System Flow
Token Generation and Expiration:

- The system generates a JWT (JSON Web Token) containing user information and a set expiration time.

- The generated link is embedded with this token for secure access.

Token Verification:

- Upon user accessing the link, the token is validated for integrity and expiration.

- If the token is valid and not expired, the system proceeds with the next step.

Redirection to Login:

- If the token is successfully verified, the user is redirected to a login page for authentication.

User Login & Token Validation:

- The user provides their login credentials (e.g., username/password).

- After successful login, the system compares the user ID from the token payload with the user ID from the login data.

- Additionally, conditions can be added to validate if the order ID and product ID from the token data match the user’s data for further security.

Successful Authentication:

- If the login is successful and all token-related conditions (user ID, order ID, product ID) are met, the user is granted access to download the associated PDF file.

PDF Generation:

- Upon successful validation, the system generates and allows the user to download the PDF file related to their account.
