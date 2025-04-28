interface AppStatCardProps {
  icon?: React.ComponentType<{ className?: string }>;
  value: number | string;
  mainTitle?: string;
  mainTitleClassName?: string;
  subTitle: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  subTitleClassName?: string;
}

const AppStatCard = ({
  icon: Icon,
  value,
  mainTitle,
  mainTitleClassName = "text-light-font01 dark:text-font01 text-sm font-light",
  subTitle,
  className = "border p-4 rounded-lg border-light-borderGray dark:border-borderGray flex flex-col gap-y-2 h-fit min-h-40 min-w-[138px]",
  iconClassName = "size-11 text-light-font01 dark:text-font01 font-thin",
  valueClassName = "text-light-font01 dark:text-font01 text-5xl font-semibold",
  subTitleClassName = "text-light-font01 dark:text-font01 text-sm font-light",
}: AppStatCardProps) => {
  return (
    <div className={className}>
      <div>
        {Icon && <Icon className={iconClassName} />}
        {mainTitle && <span className={mainTitleClassName}>{mainTitle}</span>}
      </div>
      <span className={valueClassName}>{value}</span>
      <span className={subTitleClassName}>{subTitle}</span>
    </div>
  );
};

export default AppStatCard;
