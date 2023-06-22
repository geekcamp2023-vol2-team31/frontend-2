const SuggestIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_497_556"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_497_556)">
        <path
          d="M12 23L9 20H5C4.45 20 3.97917 19.8042 3.5875 19.4125C3.19583 19.0208 3 18.55 3 18V4C3 3.45 3.19583 2.97917 3.5875 2.5875C3.97917 2.19583 4.45 2 5 2H19C19.55 2 20.0208 2.19583 20.4125 2.5875C20.8042 2.97917 21 3.45 21 4V18C21 18.55 20.8042 19.0208 20.4125 19.4125C20.0208 19.8042 19.55 20 19 20H15L12 23ZM5 18H9.8L12 20.2L14.2 18H19V4H5V18ZM13.55 12.55L17 11L13.55 9.45L12 6L10.45 9.45L7 11L10.45 12.55L12 16L13.55 12.55Z"
          fill="#676461"
        />
      </g>
    </svg>
  );
};

export { SuggestIcon };
