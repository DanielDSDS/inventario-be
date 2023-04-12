import SQLDataSource from '..';
import { User } from "../entities/User";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = "superSecret";

/**
 * @description Get a user by email
 * @param {string} email The email address of the user
 * @returns {Promise<User | undefined>} The user with the specified email, or undefined if not found
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const userRepository = SQLDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });
  return user;
}

/**
 * @description Compare a plaintext password with a hashed password
 * @param {string} password The plaintext password
 * @param {string} hashedPassword The hashed password
 * @returns {Promise<boolean>} True if the passwords match, false otherwise
 */
export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

/**
 * @description Generate a JSON Web Token for a user
 * @param {User} user The user for which to generate the token
 * @returns {string} The generated JSON Web Token
 */
export function generateToken(user: User): string {
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
  return token;
}
