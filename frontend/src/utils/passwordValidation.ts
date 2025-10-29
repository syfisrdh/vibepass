export const validatePassword = (password: any) => {
  const requirements = {
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    hasMinLength: password.length >= 8,
  };

  const missingRequirements = [];
  
  if (!requirements.hasLowercase) {
    missingRequirements.push('At least one lowercase letter (a-z)');
  }
  if (!requirements.hasUppercase) {
    missingRequirements.push('At least one uppercase letter (A-Z)');
  }
  if (!requirements.hasDigit) {
    missingRequirements.push('At least one digit (0-9)');
  }
  if (!requirements.hasSpecialChar) {
    missingRequirements.push('At least one special character (!@#$%^&* etc.)');
  }
  if (!requirements.hasMinLength) {
    missingRequirements.push('At least 8 characters');
  }

  return {
    isValid: missingRequirements.length === 0,
    missingRequirements,
    requirements,
  };
};