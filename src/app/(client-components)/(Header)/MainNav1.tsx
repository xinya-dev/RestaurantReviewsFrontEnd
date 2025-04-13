import React, { FC } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import LangDropdown from "./LangDropdown";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import NotifyDropdown from "./NotifyDropdown";
import Avatar from "@/shared/Avatar";
import { useRouter } from "next/navigation";
import AvatarDropdown from "./AvatarDropdown";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const { isAuthenticated, user, logout, authState } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // This will force a re-render when authState changes
  React.useEffect(() => {
    // This effect will run whenever authState changes
  }, [authState]);

  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container h-20 relative flex justify-between">
        <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
          <Logo className="w-24 self-center" />
          <Navigation />
        </div>

        <div className="flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 ">
          <div className="self-center flex-1">
            <HeroSearchForm2MobileFactory />
          </div>
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-3">
            <Link
              href="/add-listing/1"
              className="self-center px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              List Your Venue
            </Link>
            <SwitchDarkMode />
            <SearchDropdown className="flex items-center" />
            <div className="px-1" />
            
            {isAuthenticated ? (
              <>
                <NotifyDropdown className="flex items-center" />
                <div className="px-1" />
                <div className="flex items-center space-x-2">
                  <AvatarDropdown
                    imgUrl={user?.profile_picture}
                    userName={user?.username}
                    sizeClass="w-8 h-8"
                  />
                </div>
              </>
            ) : (
              <ButtonPrimary className="self-center" href="/login">
                Sign up / Sign in
              </ButtonPrimary>
            )}
          </div>

          <div className="flex xl:hidden items-center">
            <SwitchDarkMode />
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
