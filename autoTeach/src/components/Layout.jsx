import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebarComponent/LeftSidebarComponent";
import Container from "./ContainerComponent/ContainerComponent";
import { useProblemContext } from "../contexts/ProblemContext";

export default function Layout() {

  const {problems} = useProblemContext();

  return (
    <div className="flex flex-row">
      <LeftSidebar problems={problems}/>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
