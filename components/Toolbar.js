import Link from 'next/link';
import styles from 'styles/Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.main}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/feed/1">
        <a>Feed</a>
      </Link>
      <Link href="/editor">
        <a>Editor</a>
      </Link>

    </div>
  );
};

export default Toolbar;
