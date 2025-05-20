import { LogIn } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LogIn />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fazer login</DialogTitle>
        </DialogHeader>
        <p className="flex items-center justify-center">
          <Button
            variant="outline"
            className="gap-1 font-bold"
            onClick={handleLoginWithGoogleClick}
          >
            <Image
              alt="Fazer login com o Google"
              src="/google.svg"
              width={18}
              height={18}
              className="bg-primary rounded-full p-0.5"
            />
            Acessar com Google
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
