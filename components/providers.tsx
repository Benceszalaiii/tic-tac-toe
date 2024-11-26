"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Providers = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      position="bottom-center"
      toastOptions={{
        classNames: {
          info: "bg-orange-500 bg-opacity-75 backdrop-blur-lg border-black border-2",
        }
      }}
      {...props}
    />
  );
};

export { Providers };
