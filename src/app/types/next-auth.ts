declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      birthday: Date;
      position: string;
      admin: boolean;
      preapprovalPlanId: string;
      monthlyPayment: string;
    };
  }
}
