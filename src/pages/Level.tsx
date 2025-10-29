import { withProtected } from "@/hooks/use-protected";
import { useLoaderData } from "react-router";
import Editor from "@monaco-editor/react";
import bossIdle from "@/assets/tutorial-person/tutorIdle.gif";
import bossIsHit from "@/assets/tutorial-person/tutorAttack.gif";
import bossWrong from "@/assets/tutorial-person/tutorWrong.gif";
import bossReceive from "@/assets/tutorial-person/tutorReceive.gif";
import bossCorrect from "@/assets/tutorial-person/tutorCorrect.gif";

import { useState, SetStateAction } from "react";
// import { TypewriterText } from "@/components/ui/text";
import { motion } from "framer-motion";

const levelDetails = {
  boss: {
    name: "Computer",
    health: 500,
    dialogs: [
      {
        text: "Hi Kids!",
        deleteAfter: true,
      },
    ],
    images: [bossIdle, bossIsHit, bossWrong, bossReceive, bossCorrect],
  },
  challenge: {
    prompts: [
      {
        question:
          "// Make a function that can add 2 variables and returns the result",
        answer: 4,
      },
      {
        question:
          "// Make a function that can add 2 variables and returns the result",
        answer: 5,
      },
    ],
  },
};

const Level = () => {
  const [bossImage, setBossImage] = useState(() =>
    levelDetails ? levelDetails.boss.images[0] : ""
  );
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(
    levelDetails.challenge.prompts[currentChallenge].question
  );
  const completedLevels = ["0"];
  const idLevel = useLoaderData<string>();

  const checkAnswer = () => {
    try {
      const userResult = eval(code);

      if (
        userResult !== levelDetails.challenge.prompts[currentChallenge].answer
      ) {
        wrongAnswer();
        return;
      }

      correctAnswer();
    } catch (error) {
      console.error("Code error:", error);
      wrongAnswer();
    }
  };

  const wrongAnswer = () => {
    setBossImage(levelDetails.boss.images[2]);
    setTimeout(() => {
      setBossImage(levelDetails.boss.images[1]);
      setTimeout(() => {
        setBossImage(levelDetails.boss.images[0]);
      }, 1000);
    }, 1000);
  };

  const correctAnswer = () => {
    const questionLength = levelDetails.challenge.prompts.length;
    setBossImage(levelDetails.boss.images[3]);
    setTimeout(() => {
      setBossImage(levelDetails.boss.images[4]);
      if (questionLength - 1 == currentChallenge) {
        return;
      }
      setTimeout(() => {
        setBossImage(levelDetails.boss.images[0]);
      }, 1000);
    }, 1000);
    if (questionLength - 1 == currentChallenge) {
      return;
    }
    setCurrentChallenge((prev) => prev + 1);
    setCode(levelDetails.challenge.prompts[currentChallenge].question);
  };

  return completedLevels.includes(idLevel.toString()) || Number(idLevel) < 0 ? (
    <div>You have completed this level</div>
  ) : (
    <div className="max-h-screen w-full flex justify-center overflow-y-scroll">
      <div className="w-full flex flex-col px-5">
        <div className="pt-4 flex flex-col md:px-0 px-2">
          <h1 className="text-4xl font-pixel!">LEVEL {idLevel}</h1>
          <div className="w-full pt-12 flex items-center justify-center">
            {/* <TypewriterText
                sequences={levelDetails.boss.dialogs}
                autoLoop
                className="font-pixel! text-4xl!"
              /> */}
            <img src={bossImage} className="max-w-[250px]" />
          </div>
        </div>
        <div className="fixed w-full bottom-0 left-0 px-5 flex flex-col gap-2 pb-2">
          <Editor
            height={250}
            theme="vs-dark"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value as SetStateAction<string>)}
            className="font-code"
          />
          <div>
            <motion.button
              className="px-4 py-1 border-2 border-black bg-red-600 text-white font-pixel! text-2xl hover:cursor-pointer"
              variants={{
                initial: {
                  y: -5,
                  boxShadow: "0px 5px black",
                },
                hovered: {
                  y: 0,
                  boxShadow: "0px 0px black",
                },
              }}
              initial="initial"
              whileHover="hovered"
              transition={{
                ease: "linear",
                duration: 0.2,
              }}
              onClick={checkAnswer}
            >
              Fight
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LevelPage = withProtected(Level);
export default LevelPage;
