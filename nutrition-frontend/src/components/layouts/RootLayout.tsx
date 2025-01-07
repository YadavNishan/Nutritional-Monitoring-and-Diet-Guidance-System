import React, { PropsWithChildren } from "react";

interface PRootLayout extends PropsWithChildren {
  setTheme?: React.Dispatch<React.SetStateAction<"customLight" | "customDark">>;
  theme?: "customLight" | "customDark";
}

const RootLayout: React.FC<PRootLayout> = ({ children, setTheme, theme }) => {
  return (
    <div>
      {setTheme && theme && (
        <button
          onClick={() =>
            setTheme((prev) =>
              prev === "customLight" ? "customDark" : "customLight",
            )
          }
          className={`btn btn-primary hidden rounded-badge border-none ${
            theme === "customLight"
              ? "bg-black text-white"
              : "bg-white text-black"
          } p-2`}
        >
          {theme === "customLight" ? "Light" : "Dark"}
        </button>
      )}
      {children}
    </div>
  );
};

export default RootLayout;
