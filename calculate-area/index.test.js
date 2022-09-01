const { calculateArea } = require('.');

describe('calculateArea', () => {
  it('should calculate the correct area for a given width and height', () => {
    const result = calculateArea({ width: 4, height: 4 });
    expect(result).toEqual(16);
  });
});
