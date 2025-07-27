import Link from 'next/link'
import { useRouter } from 'next/router';

function LinkItem({ href, path, title,icons,customActiv="",customclassName="" }) {
  const { pathname } = useRouter();
  const activeClass = pathname === path
    ? `active flex gap-1.5 items-center ${customActiv}`
    : 'text-(--color-text) flex gap-1 items-center';

  return (
    <Link href={href} className={`${activeClass} ${customclassName}`}>
      {icons}
      {title}
    </Link>
  );
}

export default LinkItem;
