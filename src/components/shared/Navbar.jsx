import { Link, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Hidden, InputBase } from '@mui/material';
import logo from '@/images/logo.png';
import { useNavbarStyles } from '@/styles';
import { useState } from 'react';
import {
  LoadingIcon,
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from '@/icons';
import { defaultCurrentUser } from '@/data';

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  let location = useLocation();
  const path = location.pathname;

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minimalNavbar && (
          <>
            <Hidden smDown>
              <Search />
            </Hidden>

            <Links path={path} />
          </>
        )}
      </section>
    </AppBar>
  );
}

function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

function Search() {
  const classes = useNavbarStyles();
  const [query, setQuery] = useState('');
  let loading = false;

  function handleClearInput() {
    setQuery('');
  }

  return (
    <Hidden xsDown>
      <InputBase
        className={classes.input}
        onChange={(evt) => setQuery(evt.target.value)}
        startAdornment={<span className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <LoadingIcon />
          ) : (
            <span onClick={handleClearInput} className={classes.clearIcon} />
          )
        }
        placeholder="Search"
        value={query}
      />
    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = useState(false);

  function handleToggleList() {
    setShowList((prev) => !prev);
  }

  return (
    <div className={classes.linksContainer}>
      <div className={classes.linksWrapper}>
        <Hidden smDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>

        <Link to="/explore">
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <div className={classes.notifications} onClick={handleToggleList}>
          {showList ? <LikeActiveIcon /> : <LikeIcon />}
        </div>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div
            className={
              path === `/${defaultCurrentUser.username}`
                ? classes.profileActive
                : ''
            }
          />
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
