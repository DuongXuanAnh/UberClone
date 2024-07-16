import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image className="onject-contain h-full w-full" src="/uber-banner.jpg" alt="logo" width={900} height={1000} />

      <div className="absolute top-20 right-14"> 
        <SignIn />
      </div>

    </div>
  );
}