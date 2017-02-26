class ErrorCredentials extends Error {
  constructor(message, style) {
    super(message);
    this.message = message;
    this.name = 'ErrorCredentials';
    this.style = 'danger';
  }
}
export default ErrorCredentials;
