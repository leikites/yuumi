import type { PropsWithChildren } from "react";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";
import Header from "../header";

function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      {children}
    </div>
  );
}

export default PageShell;
