import { useLevelsContext } from "@/components/provider/LevelsProvider";
import { withProtected } from "@/hooks/use-protected";

const Levels = () => {
  const { levels } = useLevelsContext();
  console.log(levels);
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
