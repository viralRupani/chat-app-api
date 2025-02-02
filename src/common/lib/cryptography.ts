import { pbkdf2 } from 'node:crypto';

export const hashPassword = (
    password: string,
    salt: string,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
};
