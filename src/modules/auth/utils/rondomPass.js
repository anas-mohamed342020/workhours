import { customAlphabet } from 'nanoid';

export function generateRandomPassword(length = 12) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
}