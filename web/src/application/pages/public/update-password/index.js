import UpdatePassword from "./UpdatePassword";

export const UpdatePasswordConfig = {
  key: "update-pass-page",
  path: "/update-password/:token",
  isAnonymousPage: true,
  component: UpdatePassword,
};
