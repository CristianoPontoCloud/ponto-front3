export interface RecoveryPasswordWithEmailFormProps {
  email: string
}
export interface RecoveryPasswordWithPhoneFormProps {
  phone: string
}
export interface ConfirmationSmsCodeFormProps {
  code: string
}

export interface RecoveryPasswordFormProps {
  password: string
  confirmPassword: string
}

export interface EnrollmentPasswordResponse {
  success: boolean,
  data: {
    message: string
  }
}
