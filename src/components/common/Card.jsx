const Card = ({
  children,
  className = '',
  title,
  action,
  ...props
}) => {
  return (
    <div className={`bg-[#393E46] rounded-lg shadow-md border border-[#4b5563] p-4 md:p-6 ${className}`} {...props}>
      {(title || action) && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4">
          {title && <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

