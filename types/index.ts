export interface AuthContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  flag: string;
  setFlag: (name: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  countryName: string;
  setCountryName: (name: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  currentStep: 'login' | 'verification' | 'signup';
  setCurrentStep: (step: 'login' | 'verification' | 'signup') => void;
  sendVerificationCode: (phone: string) => void;
  resetAuth: () => void;
}

export interface Country {
  code: string;
  flag: string;
  name: string;
  phone: string;
}
