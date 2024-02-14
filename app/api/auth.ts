import { PCConnectionInstance } from ".";

interface LoginBody {
  email: string;
  password: string;
}

export const logIn = async (body: LoginBody) => {
  return PCConnectionInstance.post("/auth/login", body);
};

export const logOut = async () => {
  return PCConnectionInstance.post("/auth/logout");
};
