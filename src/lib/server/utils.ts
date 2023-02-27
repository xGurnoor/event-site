import * as argon from 'argon2';

function hashPassword(password: string) {
	return argon.hash(password);
}

function verifyPassword(password: string, hash: string) {
	return argon.verify(hash, password);
}

export default { hashPassword, verifyPassword };
