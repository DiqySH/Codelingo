import { auth } from "@/services/firebase";
import { useEffect, useState, ReactNode } from "react";
import { InitialUserState, useUser } from "./user";
import { Spinner } from "@/components/ui/spinner";

interface AuthStateChangeProviderProps {
  children: ReactNode;
}

const AuthStateChangeProvider = ({
  children,
}: AuthStateChangeProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { SetUser } = useUser();

  const InitiateAuthStateChange = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        SetUser({ email: user.email, uid: user.uid, avatar: user.photoURL });
        console.log("User signed in:", user);
      } else {
        SetUser(InitialUserState);
        console.log("No user signed in");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <main className="w-full min-h-screen grid place-items-center dark:bg-black">
        <Spinner />
      </main>
    );
  }

  return <>{children}</>;
};

export default AuthStateChangeProvider;
