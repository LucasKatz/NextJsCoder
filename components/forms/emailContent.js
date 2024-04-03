export const generateEmailContent = (userData, cart, orderId) => {
    let emailContent = `
      Night Owl Resources New Purchase
      User: ${userData.name} ${userData.surname}
      Email: ${userData.email}
      Phone: ${userData.phone}
      Purchase Details:
    `;
    cart.forEach((cartProduct) => {
      emailContent += `
        ${cartProduct.title} - Quantity: ${cartProduct.quantity}
        Unit Price: $${cartProduct.price}
      `;
    });
    emailContent += `
      Total: $${cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)}
      Ticket ID: ${orderId}
      Thank you for your purchase!`;
      console.log("this is email content",emailContent)
    return emailContent;
  };
  