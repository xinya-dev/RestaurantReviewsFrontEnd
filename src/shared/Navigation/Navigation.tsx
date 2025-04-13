import React from "react";
import NavigationItem from "./NavigationItem";
import { PathName } from "@/routers/types";

const NAVIGATION_ITEMS = [
  { id: "post-review", name: "Post a Review or Photo", href: "/post-review" as PathName },
  { id: "services", name: "Our Services", href: "/services" as PathName },
  { id: "support-contact", name: "Support / Contact", href: "/contact" as PathName },
];

function Navigation() {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:items-center lg:justify-between lg:space-x-2 
    relative" style={{ marginLeft: '15%' }}>
      {NAVIGATION_ITEMS.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}

    </ul>
  );
}

export default Navigation;
