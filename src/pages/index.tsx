import type { NextPage } from "next";
import Test from "../components/teams/InterelementLink";

const Home: NextPage = () => {
  return (
    <div>
      <Test
        leftItemId="1"
        rightItemId="2"
        x0={100}
        y0={100}
        x1={200}
        y1={200}
      />
      <Test
        leftItemId="1"
        rightItemId="2"
        x0={200}
        y0={100}
        x1={100}
        y1={200}
      />
    </div>
  );
};

export default Home;
