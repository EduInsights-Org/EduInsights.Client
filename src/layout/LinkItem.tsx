import { NavLink } from "react-router-dom";

const LinkItem = ({ to, icons, title, isActive }: ListItemLinkProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={`flex items-center px-3 py-2 gap-x-2 text-sm font-medium mb-1 hover:bg-light-hoverBg dark:hover:bg-hoverBg rounded-md
          ${
            isActive
              ? "dark:text-font01 text-light-font01 bg-light-hoverBg dark:bg-hoverBg rounded-md"
              : "text-light-font02 dark:text-font02"
          }`}
      >
        {icons ? (isActive ? icons[1] : icons[0]) : null}
        <span>{title}</span>
      </NavLink>
    </li>
  );
};

export default LinkItem;

interface ListItemLinkProps {
  icons: React.ReactElement[] | undefined;
  to: string;
  title: string;
  isActive: boolean;
}
