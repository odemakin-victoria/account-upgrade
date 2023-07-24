import { UPDATE_ACCOUNT_REQUEST } from "@/pages/routes-config"
import { useClickOutside } from "@mantine/hooks"
import { ReactNode, useState } from "react"
import { BsArrowRight } from "react-icons/bs"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { Link } from "react-router-dom"

export default function Layout({ children }: { children: ReactNode }) {
    const [showMenu, setShowMenu] = useState(false)
    const ref = useClickOutside(() => setShowMenu(false))

    return (
        <div
            className=" bg-red-300 overflow-scroll"
            style={{
                background: `url(https://forms.zohopublic.com/optimusbankhr/downloadlogoperma?filepath=/optimusbankhr/zf-customthemes-zf/1683535029165_title__2_.jpg)`,
                backgroundSize: "stretch",
                // backgroundRepeat:'no-repeat'
            }}
        >
                    <header className="w-full bg-white md:px-14 px-6 py-6 md:fixed h-24 z-50 flex items-center justify-between relative">
                <nav>
                    <img
                        src="https://optimusbank.com/assets/images/header/Optimus_Logo.svg"
                        alt="optimus_bank_logo"
                    />
                </nav>

                <HiOutlineMenuAlt3
                            size={24}
                            className="cursor-pointer md:hidden"
                            onClick={() => setShowMenu(!showMenu)}
                        />

                <div
                    ref={ref}
                    className={`${
                        showMenu
                            ? "absolute top-20 flex bg-white flex-col items-start w-full left-0"
                            : "hidden "
                    } md:flex `}
                >
                    {" "}
                    <Link
                        to="https://optimusbank.com"
                        className="transition-all p-4 rounded hover:bg-blue-500 hover:text-white inline-flex items-center justify-center justify-self-end"
                    >
                        <span>Home</span>
                    </Link>
                    <Link
                        to={UPDATE_ACCOUNT_REQUEST}
                        className="transition-all p-4 rounded hover:bg-blue-500 hover:text-white inline-flex items-center justify-center "
                    >
                        <span>Update Account Request</span>{" "}
                        <BsArrowRight className="ml-4" />
                    </Link>
                </div>
            </header>
            <main className="lg:px-96 lg:mt-56 mt-24">{children}</main>
        </div>
    )
}
