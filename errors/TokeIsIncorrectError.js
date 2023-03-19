class TokeIsIncorrectError extends Error {
  constructor() {
    super();
    this.name = 'TokeIsIncorrectError';
    this.statusCode = 401;
    this.message = 'Токен некорректный';
  }
}

module.exports = TokeIsIncorrectError;
