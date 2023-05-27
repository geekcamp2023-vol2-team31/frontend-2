import type { NextPage } from "next";
import { useState } from "react";
import Test from "../components/teams/InterelementLink";

const Home: NextPage = () => {
  const [state, setState] = useState(true);

  return (
    <div>
      <Test
        leftItemId="1"
        rightItemId="2"
        x0={100}
        y0={100}
        x1={200}
        y1={200}
        emphasized={state}
      />
      <Test
        leftItemId="1"
        rightItemId="2"
        x0={200}
        y0={100}
        x1={100}
        y1={200}
        emphasized={!state}
      />

      <button onClick={() => setState(true)}>True</button>
      <button onClick={() => setState(false)}>False</button>
      {state ? "true" : "false"}
    </div>
  );
};

export default Home;
