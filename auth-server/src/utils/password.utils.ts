import crc from 'crc';
import * as crypto from 'crypto';

const PasswordAlgorithm = {
  SHA256: 'sha256',
  BCRYPT: 'bcrypt',
};

export function createHashedPassword(password: string): string {
  return `{${PasswordAlgorithm.SHA256}}${hashPasswordBySha256(password)}`;
}

export function hashPasswordBySha256(password: string): string {
  const hashedPrefix = crc.crc32('nubilab').toString(16);
  return crypto
    .createHash(PasswordAlgorithm.SHA256)
    .update(hashedPrefix + password)
    .digest('hex');
}

export function isIncorrectPassword(
  inputPassword: string,
  savedPassword: string,
): boolean {
  const encodingIdentifier = savedPassword.substring(
    1,
    savedPassword.indexOf('}'),
  );
  const hashedPassword = savedPassword.substring(
    savedPassword.indexOf('}') + 1,
  );
  if (encodingIdentifier === PasswordAlgorithm.SHA256) {
    return hashPasswordBySha256(inputPassword) !== hashedPassword;
  }

  return false;
}
