import { withProtected } from "@/hooks/use-protected";

const Home = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <h1>CodeLingo</h1>
    </div>
  );
};

const HomePage = withProtected(Home);
export default HomePage;
