import Link from "next/link";
import type { Category } from "../lib/types";

const SideNav = ({
  categories,
  active,
}: {
  categories: Category[];
  active: string | undefined;
}) => {
  return (
    <div>
      <ul className="menu bg-base-200 w-72 text-md rounded-md">
        <li>
          <Link href="/" className={active === undefined ? "active" : ""}>
            All
          </Link>
        </li>
        {categories &&
          categories.map((category: Category, index: number) => {
            const categoryUrl = `/?category=${category.slug}`;
            return (
              <li key={index}>
                <Link
                  href={categoryUrl}
                  className={active === category.slug ? "active" : ""}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SideNav;
