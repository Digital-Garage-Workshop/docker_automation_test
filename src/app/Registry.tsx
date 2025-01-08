"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

export default function Registry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: "my-prefix",
    });

    let inserted: string[] = [];
    const originalInsert = cache.insert;
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return originalInsert.apply(cache, args);
    };

    return {
      cache,
      flush: () => {
        const prevInserted = inserted;
        inserted = [];
        let styles = "";
        prevInserted.forEach((name) => {
          styles += cache.inserted[name];
        });
        return { names: prevInserted, styles };
      },
    };
  });

  useServerInsertedHTML(() => {
    const { names, styles } = flush();
    if (!styles) return null;

    return (
      <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <style
          data-emotion={`${cache.key} ${names.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: styles }}
        />
      </>
    );
  });

  return (
    <CacheProvider value={cache}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
