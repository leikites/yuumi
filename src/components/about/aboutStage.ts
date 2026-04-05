import type { ReactNode } from "react";

export type AboutStageMeta = {
  footerTitle: string;
  id: string;
  title: string;
};

export type AboutStageScreen = AboutStageMeta & {
  panel: ReactNode;
};
