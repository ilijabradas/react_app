class ErrorMail extends Error {
  constructor(message, style) {
    super(message);
    this.message = message;
    this.name = 'ErrorMail';
    this.style = 'danger';
  }
}
export default ErrorMail;
