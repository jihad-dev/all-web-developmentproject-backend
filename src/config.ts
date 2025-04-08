export default {
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expires_in: process.env.JWT_EXPIRES_IN || '1d'
    }
}; 