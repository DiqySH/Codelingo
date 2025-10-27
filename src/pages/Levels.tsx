import { useLevelsContext } from "@/components/LevelsProvider";
import { withProtected } from "@/hooks/use-protected";

const Levels = () => {
  const { levels, isLoading } = useLevelsContext();
  return (
    <div>
      {levels.map((level) => (
        <div key={level._id}>{level.title}</div>
      ))}
    </div>
  );
};

const LevelsPage = withProtected(Levels);
export default LevelsPage;
