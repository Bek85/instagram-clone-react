import Navbar from '@/components/shared/Navbar'
import SEO from '@/components/shared/Seo'
import { useLayoutStyles } from '@/styles'

function Layout({ children, minimalNavbar = false, title, marginTop = 60 }) {
	const classes = useLayoutStyles()

	return (
		<section className={classes.section}>
			<SEO title={title} />
			<Navbar minimalNavbar={minimalNavbar} />

			<main className={classes.main} style={{ marginTop }}>
				<section className={classes.childrenWrapper}>
					<div className={classes.children}>{children}</div>
				</section>
			</main>
		</section>
	)
}

export default Layout
