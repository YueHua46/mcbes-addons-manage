import { useSpring, animated } from "react-spring";
import { useLocation } from "react-router-dom";

export default function Error({ errorMessage }: { errorMessage?: string }) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const location = useLocation();

  console.log("location", location);

  return (
    <animated.div
      style={props}
      className="flex flex-col justify-center items-center w-full h-full"
    >
      <div className="text-6xl text-red-500 mb-4 animate-bounce">Error</div>
      <div className="text-2xl text-gray-500">
        {location.state.errorMessage || errorMessage}
      </div>
    </animated.div>
  );
}
