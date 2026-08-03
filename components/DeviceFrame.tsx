"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DeviceFrameContext = createContext<HTMLDivElement | null>(null);

export function useDeviceFrameContainer() {
  return useContext(DeviceFrameContext);
}

export function DeviceFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setNode}
      className={cn(
        "relative flex h-[min(100dvh,852px)] w-[min(100%,393px)] transform-gpu flex-col overflow-hidden bg-white shadow-md",
        className
      )}
    >
      <DeviceFrameContext.Provider value={node}>
        {children}
      </DeviceFrameContext.Provider>
    </div>
  );
}
