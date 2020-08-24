import React from "react";
import Link from "./Link";

interface Props {
  links: string[];
}

export default function Category({ links }: Props) {
  return (
    <div>
      <ul>
        {links.map((link) => {
          <Link></Link>;
        })}
      </ul>
    </div>
  );
}
