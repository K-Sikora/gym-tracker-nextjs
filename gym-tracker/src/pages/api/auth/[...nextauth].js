import NextAuth from "next-auth";
import dbPool from "../../../connection.js";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        return new Promise((resolve, reject) => {
          dbPool.query(
            "SELECT * FROM users WHERE email = ?",
            [credentials.username],
            (err, results) => {
              if (err) {
                console.log(err);
                return reject({ Message: "Internal Server Error" });
              }
              if (results && results.length > 0) {
                const userDb = results[0];
                bcrypt.compare(
                  credentials.password,
                  userDb.password,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      return reject({ Message: "Internal Server Error" });
                    }
                    if (result === true) {
                      return resolve({
                        name: userDb.id,
                        email: credentials.username,
                      });
                    } else {
                      return reject({
                        code: 401,
                        message: "Invalid Password",
                      });
                    }
                  }
                );
              } else {
                return reject({ code: 401, message: "Invalid E-mail" });
              }
            }
          );
        });
      },
    }),
  ],
};

export default NextAuth(authOptions);
