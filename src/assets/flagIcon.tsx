const FlagIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="fill"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 14V0H7L7.5 2H12V10H7L6.5 8H1.5V14H0ZM8.16667 8.5H10.5V3.5H6.33333L5.83333 1.5H1.5V6.5H7.66667L8.16667 8.5Z" />
    </svg>
  );
};

export { FlagIcon };
