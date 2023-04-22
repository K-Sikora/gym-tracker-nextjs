import NextAuth from "next-auth";
import dbPool from "../../../connection.js";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  pages: {
    signIn: "/",
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
                return res
                  .status(500)
                  .json({ Message: "Internal Server Error" });
              }
              if (results && results.length > 0) {
                const userDb = results[0];
                bcrypt.compare(
                  credentials.password,
                  userDb.password,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      return res
                        .status(500)
                        .json({ Message: "Internal Server Error" });
                    }
                    if (result === true) {
                      return resolve({
                        user: {
                          name: credentials.username,
                        },
                      });
                    } else {
                      return res
                        .status(401)
                        .json({ Message: "Invalid Credentials" });
                    }
                  }
                );
              } else {
                return res.status(401).json({ Message: "Invalid Credentials" });
              }
            }
          );
        });
      },
    }),
  ],
};

export default NextAuth(authOptions);
