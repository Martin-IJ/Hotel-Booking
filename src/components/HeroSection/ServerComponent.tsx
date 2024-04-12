import Image from "next/image";
import Link from "next/link";

export const heading1 = (
  <>
    <h1 className="font-heading mb-6">Explore our Exquisite Hotel</h1>
    <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
      Experience an Exquisite Hotel immersed in Rich History and Timeless
      Elegance.
    </p>
    <Link href="/rooms">
      <button className="btn-primary">Get started</button>
    </Link>
  </>
);

export const section2 = (
  <>
    <div className="grid md:gap-4 lg:gap-8 grid-cols-1">
      <div className="rounded-2xl overflow-hidden h-48">
        <Image
          src="/images/hero-1.jpeg"
          alt="hero-1"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>

      <div className="hidden md:grid grid-cols-2 md:gap-4 lg:gap-8 h-48">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-2.jpeg"
            alt="hero-2"
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-3.jpeg"
            alt="hero-3"
            width={300}
            height={300}
            className="img scale-animation"
          />
        </div>
      </div>
    </div>
  </>
);