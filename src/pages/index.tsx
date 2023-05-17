import Link from 'next/link';

export default function Home() {
  return (
    <Link href={'/extrato'} passHref>
      VER EXTRATO
    </Link>
  );
}
