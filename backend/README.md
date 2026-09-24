# Backend local setup

The backend connects to the existing MySQL schema without changing it. Supply the database password and a private JWT signing key through environment variables before starting Spring Boot. The JWT key must be at least 32 bytes.

In PowerShell, from the `backend` directory:

```powershell
$env:DB_URL = "jdbc:mysql://localhost:3306/AI_Scheme_Finder"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "<your MySQL password>"
$env:JWT_SECRET = "<a private random value of at least 32 characters>"
.\mvnw.cmd spring-boot:run
```

`DB_URL` and `DB_USERNAME` default to the local database and `root`. `DB_PASSWORD` and `JWT_SECRET` are never stored in the repository. Set a fresh JWT secret; changing it invalidates tokens issued with an earlier secret.

Run the backend checks with `.\mvnw.cmd test`. Tests use an isolated in-memory H2 database and do not connect to MySQL.
