import { withProtected } from "@/hooks/use-protected";
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import useRealtimeValue from "@/hooks/database/use-realtime-value";
import { LevelObject } from "@/types";
import NotFound from "./NotFound";

const Level = () => {
  const level = useLoaderData();
  const { data, isEmpty } = useRealtimeValue<LevelObject>(`/levels/${level}`);
  const [code, setCode] = useState<string>(`Wait...`);
  const [isCorrect, setIsCorrect] = useState(false);
  console.log(data);
  const runCode = (value: string) => {
    const ans = eval(value);
    return ans == data?.answer ? setIsCorrect(true) : setIsCorrect(false);
  };

  useEffect(() => {
    setCode(`
// Level ${level}
${data?.question}

${data?.defaultCode}
 14`);
  }, [data, level]);

  return isEmpty ? (
    <NotFound />
  ) : (
    <div className="w-full min-h-screen flex flex-col">
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={code}
        className="max-w-[800px] font-code min-h-[500px] max-h-[500px]"
        onChange={
          setCode as (
            value: string | undefined,
            ev: editor.IModelContentChangedEvent
          ) => void
        }
      />
      <Button className="w-fit" onClick={() => runCode(code)}>
        Run code
      </Button>
      {(isCorrect && <span>Code is correct!</span>) || (
        <span>Code is incorrect!</span>
      )}
    </div>
  );
};

const LevelPage = withProtected(Level);
export default LevelPage;
