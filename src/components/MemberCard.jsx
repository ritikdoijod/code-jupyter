import React from "react";
import { twMerge } from "tailwind-merge";

const MemberCard = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        `group mt-4 rounded-md bg-theme-200 px-6 py-3  hover:bg-accent-500 dark:bg-theme-700 dark:hover:bg-accent-400 ${className}`
      )}
    >
      {children}
    </div>
  );
};

const Header = ({ className, children }) => {
  return (
    <h2
      className={twMerge(
        `text-lg font-semibold text-theme-900 group-hover:text-theme-50 dark:text-theme-50 dark:group-hover:text-theme-900 ${className}`
      )}
    >
      {children}
    </h2>
  );
};

const SubHeading = ({ className, children }) => {
  return (
    <p
      className={twMerge(
        `text-sm text-theme-500 group-hover:text-theme-200 dark:text-theme-400 dark:group-hover:text-theme-600 ${className}`
      )}
    >
      {children}
    </p>
  );
};

const Text = ({ className, children }) => {
  return (
    <p
      className={twMerge(
        `text-xs text-theme-500 group-hover:text-theme-200 dark:text-theme-400 dark:group-hover:text-theme-500 ${className}`
      )}
    >
      {children}
    </p>
  );
};

const Line = () => {
  return <hr className="h-[2px] border-none bg-theme-300 dark:bg-theme-600" />;
};

MemberCard.Header = Header;
MemberCard.SubHeading = SubHeading;
MemberCard.Text = Text;
MemberCard.Line = Line;

export default MemberCard;
