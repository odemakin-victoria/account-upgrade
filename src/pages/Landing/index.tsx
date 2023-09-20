import { Link } from "react-router-dom"
import {
    CREATE_ACCOUNT_REQUEST,
    // UPDATE_ACCOUNT_REQUEST,
} from "../routes-config"
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
export default function Landing() {
    return (
        <div
            className="h-screen flex flex-col items-center justify-center"
            style={{
                background: `url(https://forms.zohopublic.com/optimusbankhr/downloadlogoperma?filepath=/optimusbankhr/zf-customthemes-zf/1683535029165_title__2_.jpg)`,
                backgroundSize: "stretch",
            }}
        >
            {/* <div className="bg-blue-500 h-10 w-full mb-20"></div> */}

            <div className="mb-20 justify-self-center items-center text-center w-fit">
                <img
                    src={headerOptimusLogo}
                    alt="optimus-logo"
                    className="mx-auto mb-6"
                />
                <h1 className="font-medium">Welcome</h1>

                <p className="text-xl">What would you like to do today?</p>
                <div className="flex w-full lg:px-20 px-6  md:flex-row flex-col my-20">
                    <Link
                        to={CREATE_ACCOUNT_REQUEST}
                        className="hover:translate-y-2 transition-all inline-flex flex-col shadow-lg hover:shadow-none bg-green-100 lg:py-10 lg:px-28 px-6 py-10 lg:w-[624px] lg:h-[359px] text-center rounded-lg"
                    >
                        <h1 className="font-bold mt-auto text-xl lg:text-[28px] lg:leading-[36px] mb-4 leading-6">
                            Account Upgrade Request
                        </h1>
                        <p>
                            Initiate an upgrade request to your account securely
                            and conveniently.
                        </p>
                    </Link>
                    {/* <Link
                    to={UPDATE_ACCOUNT_REQUEST}
                    
                    className="hover:translate-y-2 transition-all inline-flex flex-col shadow-lg hover:shadow-none bg-blue-500 lg:px-28 px-6 py-10 lg:py-10 lg:w-[624px] lg:h-[359px] text-center text-white rounded-lg"
                >
                    <h1 className="font-bold mt-auto text-xl lg:text-[28px] lg:leading-[36px]  mb-4">
                       Modify Account Information 
                    </h1>
                    <p className="leading-6">
                        Keep your account information up to date.
                    </p>
                </Link> */}
                </div>
            </div>
        </div>
    )
}
