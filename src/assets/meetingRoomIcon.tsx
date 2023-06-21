const MeetingRoomIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 18V16H2V0H12V1H16V16H18V18H14V3H12V18H0ZM8 10C8.28333 10 8.52083 9.90417 8.7125 9.7125C8.90417 9.52083 9 9.28333 9 9C9 8.71667 8.90417 8.47917 8.7125 8.2875C8.52083 8.09583 8.28333 8 8 8C7.71667 8 7.47917 8.09583 7.2875 8.2875C7.09583 8.47917 7 8.71667 7 9C7 9.28333 7.09583 9.52083 7.2875 9.7125C7.47917 9.90417 7.71667 10 8 10ZM4 16H10V2H4V16Z" />
    </svg>
  );
};

export { MeetingRoomIcon };
