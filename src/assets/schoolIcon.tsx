const SchoolIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M9 14L3.5 11.25V6.25L0 4.5L9 0L18 4.5V11H16.5V5.25L14.5 6.25V11.25L9 14ZM9 7.3125L14.6458 4.5L9 1.6875L3.35417 4.5L9 7.3125ZM9 12.3125L13 10.3125V7L9 9L5 7V10.3125L9 12.3125Z" />
    </svg>
  );
};

export { SchoolIcon };
