interface AppStatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  title: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  titleClassName?: string;
}

const AppStatCard = ({
  icon: Icon,
  value,
  title,
  className = "border p-4 rounded-lg border-light-borderGray dark:border-borderGray flex flex-col gap-y-2",
  iconClassName = "size-11 text-light-font01 dark:text-font01 font-thin",
  valueClassName = "text-light-font01 dark:text-font01 text-5xl font-semibold",
  titleClassName = "text-light-font01 dark:text-font01 text-sm font-light",
}: AppStatCardProps) => {
  return (
    <div className={className}>
      <Icon className={iconClassName} />
      <span className={valueClassName}>{value}</span>
      <span className={titleClassName}>{title}</span>
    </div>
  );
};

export default AppStatCard;
