import { Button } from "@/components/ui/button";
import { withProtected } from "@/hooks/use-protected";
import { Level } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

const Levels = () => {
  const [levels, setLevels] = useState<Level[] | []>([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_MONGO_LEVELS);
      setLevels(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return levels.length !== 0 ? (
    <div>
      {levels.map((level, idx) => {
        const date = new Date(level.createdAt);
        return (
          <div className="flex flex-col" key={level._id}>
            <p>{level.title}</p>
            <p>Created at: {date.toString()}</p>
            <Button
              className="w-fit"
              onClick={() => navigate(`/levels/${idx}`)}
            >
              Start
            </Button>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="grid place-items-center w-full min-h-screen">
      <Spinner />
    </div>
  );
};

const LevelsPage = withProtected(Levels);
export default LevelsPage;
