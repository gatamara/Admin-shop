


describe('Main', () => {
  test('should return proper env values', () => {
    //expect(1).toBe(1);
    console.log(import.meta.env.VITE_TESLO_API_URL);
    expect(import.meta.env.VITE_TESLO_API_URL).toBe('https://vue-nest-teslo-ts.up.railway.app/api');
  });
});
