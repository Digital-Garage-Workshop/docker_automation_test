import { createDecipheriv, randomBytes } from 'crypto';

const decrypt = (encryptedData: string, base64Iv: string, sharedKey: string): string | null => {
    try {
        const algorithm = 'aes-256-cbc';
        const iv = Buffer.from(base64Iv, 'base64');
        const key = Buffer.from(sharedKey, 'utf8'); 

        const decipher = createDecipheriv(algorithm, key, iv);

        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        return null;
    }
};

