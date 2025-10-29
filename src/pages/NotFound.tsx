import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-5 items-center justify-center ">
        <img width={70} src="/locales/lostFirePlace.gif" alt="" />
        <h1 className="text-7xl">404</h1>
        <p className="text-sm">
          It seems you travel too far...{"  "}
          <a
            onClick={() => {
              navigate(-1);
            }}
            className="italic underline"
          >
            it doesnt mean you lost.
          </a>
        </p>
      </div>
    </>
  );
};

export default NotFound;
