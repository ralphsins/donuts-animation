import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen text-4xl h-screen flex items-center justify-center">
      <Link href={"/donut"} >
      donut
      </Link >
    </div>
  );
}
