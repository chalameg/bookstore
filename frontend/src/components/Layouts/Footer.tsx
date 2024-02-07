import { Poppins } from "next/font/google";
import Image from "next/image";
import { MdNavigateNext } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const poppins = Poppins({subsets: ['latin'], weight: "600"})

const Footer: React.FC = () => {
    const quickLinks = [
        { href: "about-us", label: "About Us" },
        { href: "services", label: "Services" },
        { href: "events", label: "Events" },
        { href: "timeline", label: "Timeline" },
        { href: "contact-us", label: "Contact" },
      ];

  return (
    <div className="relative h-[500px]" >
      <div className={`bg-[#4E4E4E] h-[87px] flex items-center justify-center text-white text-[26px] ${poppins.className}`}>
        Contact Us <MdNavigateNext />   hello@tef.com   <MdNavigateNext /> +234 810 000 0000
      </div>

      <div className="bg-[#0B0D13] sm:px-32 px-4 h-[369px] flex items-center pt-4 justify-between">
        <div className="flex flex-col gap-10">
            <Image src="/images/tef-logo-transparent.png" height={63} width={385} alt="logo"/>
            <span className="text-white text-[22px] leading-[26px]">Timeless Entertainment Factory is staging talent hunt shows across selected <br/> 
                states in Nigeria, showcasing exceptional talents worthy to be on our<br/> platform.
            </span>
            <div className="flex gap-4 text-white items-center">
                <Link  href="#facebook">
                <TiSocialFacebook className="w-[33px] h-[33px]"/>
                </Link>
                <Link  href="#twitter">
                <FaXTwitter className="w-[27px] h-[27px]"/>
                </Link>
                <Link  href="#instagram">
                <CiInstagram className="w-[32px] h-[32px]"/>
                </Link>
                
            </div>
        </div>

        <div className="flex flex-col text-white text-[20px] gap-1">
            <span>Quick Links</span>
            {quickLinks.map(quickLink => {
                return <Link key={quickLink.label} href={quickLink.href}><span className="text-[#969696] uppercase">{quickLink.label}</span></Link>
            })}
        </div>
      </div>

      <div className="sm:px-32 px-4 text-black flex justify-between text-[16px] items-center h-[48px]">
        <span>Copyright PicturePerfect 2023. All rights reserved.</span>
        <span>Terms & Conditions  | Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
