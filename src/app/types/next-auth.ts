import "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      birthday?: Date | null;
      position?: string | null;
      admin?: boolean;
      subscriptionExpiresAt?: Date | null;
      monthlypayment?: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    birthday?: Date | null;
    position?: string | null;
    admin?: boolean;
    subscriptionExpiresAt?: Date | null;
    monthlypayment: boolean;
  }
}
