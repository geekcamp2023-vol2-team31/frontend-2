const PlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" />
    </svg>
  );
};

export { PlusIcon };
