const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (successMessage) {
      successMessage.style.display = 'none';
    }
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://formsubmit.co/ajax/builtbykyree@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      contactForm.reset();
      if (successMessage) {
        successMessage.style.display = 'block';
      }
    } catch (error) {
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
    }
  });
}
