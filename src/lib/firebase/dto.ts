import { FirebaseError } from "firebase/app";

export enum FirebaseAuthErrorType {
  InvalidCredential = "auth/invalid-credential",
  EmailAlreadyExists = "auth/email-already-exists",
  IdTokenExpired = "auth/id-token-expired",
  IdTokenRevoked = "auth/id-token-revoked",
  InvalidContinueUri = "auth/invalid-continue-uri",
  InvalidEmail = "auth/invalid-email",
  InvalidEmailVerified = "auth/invalid-email-verified",
  InvalidIdToken = "auth/invalid-id-token",
  InvalidPageToken = "auth/invalid-page-token",
  InvalidPhoneNumber = "auth/invalid-phone-number",
  InvalidProviderId = "auth/invalid-provider-id",
  InvalidSessionCookieDuration = "auth/invalid-session-cookie-duration",
  MissingContinueUri = "auth/missing-continue-uri",
  OperationNotAllowed = "auth/operation-not-allowed",
  PhoneNumberAlreadyExists = "auth/phone-number-already-exists",
  SessionCookieExpired = "auth/session-cookie-expired",
  SessionCookieRevoked = "auth/session-cookie-revoked",
  TooManyRequests = "auth/too-many-requests",
  UserNotFound = "auth/user-not-found",
}

export interface FirebaseAuthErrorDTO {
  code: FirebaseError["code"];
  message: string;
}

export const getFirebaseAuthErrorMessage = (error: FirebaseAuthErrorDTO): string => {
  switch (error.code) {
    case FirebaseAuthErrorType.InvalidCredential:
      return "Email atau password salah";
    case FirebaseAuthErrorType.EmailAlreadyExists:
      return "Email sudah digunakan oleh pengguna lain.";
    case FirebaseAuthErrorType.IdTokenExpired:
      return "Token ID Firebase telah kedaluwarsa.";
    case FirebaseAuthErrorType.IdTokenRevoked:
      return "Token ID Firebase telah dicabut.";
    case FirebaseAuthErrorType.InvalidContinueUri:
      return "URL lanjutan tidak valid.";
    case FirebaseAuthErrorType.InvalidEmail:
      return "Email tidak valid.";
    case FirebaseAuthErrorType.InvalidEmailVerified:
      return "Status verifikasi email tidak valid.";
    case FirebaseAuthErrorType.InvalidIdToken:
      return "Token ID tidak valid.";
    case FirebaseAuthErrorType.InvalidPageToken:
      return "Token halaman tidak valid.";
    case FirebaseAuthErrorType.InvalidPhoneNumber:
      return "Nomor telepon tidak valid.";
    case FirebaseAuthErrorType.InvalidProviderId:
      return "Provider ID tidak valid.";
    case FirebaseAuthErrorType.InvalidSessionCookieDuration:
      return "Durasi cookie sesi tidak valid.";
    case FirebaseAuthErrorType.MissingContinueUri:
      return "URL lanjutan tidak disertakan.";
    case FirebaseAuthErrorType.OperationNotAllowed:
      return "Operasi tidak diizinkan.";
    case FirebaseAuthErrorType.PhoneNumberAlreadyExists:
      return "Nomor telepon sudah digunakan oleh pengguna lain.";
    case FirebaseAuthErrorType.SessionCookieExpired:
      return "Cookie sesi telah kedaluwarsa.";
    case FirebaseAuthErrorType.SessionCookieRevoked:
      return "Cookie sesi telah dicabut.";
    case FirebaseAuthErrorType.TooManyRequests:
      return "Terlalu banyak permintaan.";
    case FirebaseAuthErrorType.UserNotFound:
      return "Pengguna tidak ditemukan.";
    default:
      return "Terjadi kesalahan otentikasi.";
  }
};
