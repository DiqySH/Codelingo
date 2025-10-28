import { withProtected } from "@/hooks/use-protected";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-4">
      <h1 className="text-4xl">Codelingo</h1>
    </div>
  );
};

const HomePage = withProtected(Home);
export default HomePage;
