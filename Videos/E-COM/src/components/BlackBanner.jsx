import Image from "next/image";
import Link from "next/link";

export default function BlackBanner() {
  return (
    <div className="relative flex justify-center items-center w-full h-[352px] mt-[100px] mb-[60px]">
  {/* Full-Width Black Background */}
  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-[106px] bg-black z-0"></div>

  {/* Banner Image (Centered) */}
  <Link href="/">
    <div className="relative z-10 flex justify-center">
      <Image
        src="https://pouchesworldwide.com/strapi/uploads/fruitybanner_9235e897dc.jpg"
        alt="Banner Image"
        width={1190} // Adjust as needed
        height={190} // Adjust as needed
        priority
        className="object-contain"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  </Link>
</div>

  );
}
