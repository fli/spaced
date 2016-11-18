import * as crypto from 'crypto';
import * as argon2 from 'argon2';

const SALT_BYTES = 16;
const OPS_LIMIT = 4;
const MEM_LIMIT = 15;
const PARALLELISM = 1;

const ARGON_OPTIONS = {
  timeCost: OPS_LIMIT,
  memoryCost: MEM_LIMIT,
  parallelism: PARALLELISM,
  argon2d: false
}

function randomBytes(size: number) {
  return new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      err ? reject(err) : resolve(buf);
    });
  });
}

export function generateSessionId() {
  return randomBytes(18).then(x => x.toString('base64'));
}

export async function generatePasswordHash(password: string) {
  return argon2.hash(password, await randomBytes(SALT_BYTES), ARGON_OPTIONS);
}

export function verifyPasswordHash(hash: string, password: string) {
  return argon2.verify(hash, password);
}
