const FeatureCard = ({ className, children }) => {
  return (
    <div
      className={`duration-400 group flex w-80 flex-col overflow-hidden rounded bg-theme-100 px-4 py-4 transition-colors ease-linear hover:overflow-visible hover:bg-accent-500 dark:bg-theme-800 dark:hover:bg-accent-400 hover:bg-gradient-to-tr hover:from-accent-700 hover:to-accent-400 dark:hover:from-accent-200 dark:hover:to-accent-700 ${className}`}
    >
      {children}
    </div>
  );
};

const Header = ({ className, children }) => {
  return (
    <h4
      className={`flex items-center text-left text-lg font-semibold leading-5 text-accent-500 group-hover:text-theme-50 dark:text-accent-400 dark:group-hover:text-theme-900  ${className}`}
    >
      {children}
    </h4>
  );
};

const Body = ({ className, children }) => {
  return (
    <div
      className={`mt-6 text-justify text-sm font-semibold text-theme-500 group-hover:text-theme-100 dark:group-hover:text-theme-600 dark:text-theme-400 ${className}`}
    >
      {children}
    </div>
  );
};

const Group = ({ className, children }) => {
  return <div className={` ${className}`}>{children}</div>;
};

const Image = ({ image, image_text, className }) => {
  return (
      <img
        src={image}
        alt={image_text}
        className={`w-16 ${className}`}
      />
  );
};

FeatureCard.Header = Header;
FeatureCard.Group = Group;
FeatureCard.Body = Body;
FeatureCard.Image = Image;

export default FeatureCard;
