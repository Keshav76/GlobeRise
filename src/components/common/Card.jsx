const Card = ({
  children,
  className = '',
  title,
  action,
  ...props
}) => {
  return (
    <div className={`bg-[#393E46] rounded-lg shadow-md border border-[#4b5563] p-6 ${className}`} {...props}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

