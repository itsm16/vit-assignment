Auth Flow
Register


User registers with name, email, and mobile number.


Backend generates and hashes a password.


User is stored in PostgreSQL using Drizzle ORM.


Password and OTP are sent to the user's email.


OTP Verification


User enters email and OTP.


Backend validates OTP (5 min expiry).


OTP is cleared after verification.


JWT token is generated and stored in an HTTP-only cookie.


Login


User logs in using email and password.


Password is verified using bcrypt.


JWT token is generated and stored in an HTTP-only cookie.


Stack


Express.js


PostgreSQL


Drizzle ORM


JWT


bcrypt


React


Tailwind CSS