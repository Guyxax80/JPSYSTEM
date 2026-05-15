"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ImageConfigValue = {
  resolve: (src: string | undefined | null) => string;
  overrides: Record<string, string>;
};

const FALLBACK_IMAGE = "/home.jpg";

const ImageConfigContext = createContext<ImageConfigValue>({
  resolve: (s) => s || FALLBACK_IMAGE,
  overrides: {},
});

export function ImageConfigProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/image-config")
      .then((r) => r.json())
      .then((data) => {
        if (data?.overrides) setOverrides(data.overrides);
      })
      .catch(() => {});
  }, []);

  const resolve = (src: string | undefined | null): string => {
    // ✅ 1. กัน null / undefined / ""
    if (!src || src.trim() === "") {
      return FALLBACK_IMAGE;
    }

    // ✅ 2. ถ้าเป็น URL เต็ม (WordPress / external) ใช้ได้เลย
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    // ✅ 3. ดึง filename
    const filename = src.replace(/^\//, "").split("/").pop();

    if (!filename) {
      return FALLBACK_IMAGE;
    }

    // ✅ 4. เช็ค override
    const overrideSrc = overrides[filename];

    if (overrideSrc && overrideSrc.trim() !== "") {
      return overrideSrc;
    }

    // ✅ 5. fallback เป็น local path เดิม
    return src;
  };

  return (
    <ImageConfigContext.Provider value={{ resolve, overrides }}>
      {children}
    </ImageConfigContext.Provider>
  );
}

export function useImageConfig() {
  return useContext(ImageConfigContext);
}