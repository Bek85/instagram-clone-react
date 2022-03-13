import { useLayoutStyles } from '@/styles';
import SEO from '@/components/shared/Seo';
import Navbar from '@/components/shared/Navbar';

function Layout({ children, title, marginTop = 60 }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      <SEO title={title} />
      <Navbar />

      <main className={classes.main} style={{ marginTop }}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

export default Layout;
