import jwt, { JwtPayload } from 'jsonwebtoken';
// Your secret key used to sign the token
const secretKey = process.env.JWT_SECRET as string;
const defaultExpiresInMinutes = 30; // Token will expire after 30 minutes


export function generateVerificationToken(data: Record<string, any>, expiresInMinutes: number = defaultExpiresInMinutes) {
    return jwt.sign(data, secretKey, { expiresIn: `${expiresInMinutes}m` });
}
// Function to verify the token and return the data if valid
export function verifyVerificationToken(token:string):string | JwtPayload |null {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        // Token verification failed or expired
        return null;
    }
}

