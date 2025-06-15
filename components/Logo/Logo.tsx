import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <h1 className="text-[14px] ">
      <Link
        href="/"
        className="flex items-center gap-2 font-black justify-start"
      >
        <Image src="/logo.svg" alt="Ahmed Lemssiah" width={30} height={50} />
        <span className="text">Ahmed Lemssiah</span>
      </Link>
    </h1>
  );
};

export default Logo;
