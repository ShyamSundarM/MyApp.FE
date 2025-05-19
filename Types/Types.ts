export type RootStackParamList = {
  HomeDrawer: "HomeDrawer";
  Auth: "Auth";
};

export type LoginResponse = {
  respCode: number;
  token: string;
};

export type RegisterResponse = {
  respCode: number;
  userId: string;
};
