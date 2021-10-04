document.addEventListener('DOMContentLoaded', () => {
  let app = firebase.app();

  const sendText = firebase.functions().httpsCallable('sendText');

  sendText({ message: 'Hello World!' })

});