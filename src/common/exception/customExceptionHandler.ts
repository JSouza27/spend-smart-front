import Swal from 'sweetalert2';

export class CustomExceptionHandler extends Error {
  constructor(message: string, name: string) {
    super();
    this.name = name;
    this.message = message;
  }

  public execute() {
    Swal.fire({
      title: this.name,
      text: this.message,
      icon: 'error',
      confirmButtonText: 'Ok',
      buttonsStyling: false,
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html-container',
        popup: 'swal-popup',
        confirmButton: 'swal-confirm-button'
      }
    });
  }
}
