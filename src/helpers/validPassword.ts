export default function validPassword(password: string): boolean {
  const validPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return validPattern.test(password);
};

// maybe change to a more detailed check