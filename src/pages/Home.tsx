import { withProtected } from "@/hooks/use-protected";
import tutorTalk from "@/assets/tutorial-person/tutorTalk.gif";
import { TypewriterText } from "@/components/ui/text";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-4">
      <TypewriterText
        className="font-pixel! text-4xl!"
        autoLoop={true}
        sequences={[
          {
            text: "Welcome to",
            deleteAfter: true,
          },
          {
            text: "Codelingo",
            deleteAfter: true,
          },
          {
            text: "by Elon Musk",
            deleteAfter: false,
          },
        ]}
      />
      <img src={tutorTalk} alt="" className="max-w-[250px]" />
    </div>
  );
};

const HomePage = withProtected(Home);
export default HomePage;
