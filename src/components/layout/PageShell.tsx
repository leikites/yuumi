import type { PropsWithChildren } from "react";
import Header from "../header";

function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <Header />
      {children}
    </div>
  );
}

export default PageShell;
