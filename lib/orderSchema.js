export function validateOrder(values = {}) {
  const fieldErrors = {};

  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const phone = typeof values.phone === "string" ? values.phone.trim() : "";
  const address =
    typeof values.address === "string" ? values.address.trim() : "";

  if (!name) {
    fieldErrors.name = "Please enter your full name.";
  }

  if (!email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!phone) {
    fieldErrors.phone = "Please enter your phone number.";
  } else if (!/^\+?[0-9\s()-]{7,20}$/.test(phone)) {
    fieldErrors.phone = "Please enter a valid phone number.";
  }

  if (!address) {
    fieldErrors.address = "Please enter your delivery address.";
  }

  return {
    values: { name, email, phone, address },
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
  };
}
