export type Payload = {
  sub: string;
  expiresIn: Date;
};

export type Req = {
  user: Payload;
};
