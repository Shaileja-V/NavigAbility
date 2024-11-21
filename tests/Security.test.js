const { Encrypt, Decrypt } = require('../Security');

describe('Encryption and Decryption', () => {
    const text = "Hello world";

    test('Encrypt and Decrypt should work correctly', () => {
        const encryptedText = Encrypt(text);
        const decryptedText = Decrypt(encryptedText)
        expect(decryptedText).toBe(text);
    });

});