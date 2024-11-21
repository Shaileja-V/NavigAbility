const {respondToText} = require('../gemini.js');

describe('Geting a message back',()=>{
    test('should return the response', async () => {
        const text = 'What is the purpose of life?';
        const result = await respondToText(text) !== null;
        expect(result).toBe(true);
    });
})