import { Link, useHistory, useLocation } from 'react-router-dom';
import { useNProgress } from '@tanem/react-nprogress';
import {
  AppBar,
  Avatar,
  Fade,
  Grid,
  Hidden,
  InputBase,
  Typography,
  Zoom,
} from '@mui/material';
import logo from '@/images/logo.png';
import { useNavbarStyles, WhiteTooltip, RedTooltip } from '@/styles';
import { useEffect, useState } from 'react';
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
import { getDefaultUser } from '@/data';
import NotificationTooltip from '@/components/notification/NotificationTooltip';
import NotificationList from '@/components/notification/NotificationList';

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  let location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setIsLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
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
    </>
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
  const [loading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const history = useHistory();

  const hasResults = Boolean(query) && results.length > 0;

  function handleClearInput() {
    setQuery('');
  }

  useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);

  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map((result) => (
                <Grid
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                  key={result.id}
                  item
                  className={classes.resultLink}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
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
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToggleList() {
    setShowList((prev) => !prev);
  }

  function handleHideTooltip() {
    setShowTooltip(false);
  }

  function handleHideList() {
    setShowList(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideList={handleHideList} />}
      <div className={classes.linksWrapper}>
        <Hidden smDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === '/' ? <HomeActiveIcon /> : <HomeIcon />}</Link>

        <Link to="/explore">
          {path === '/explore' ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>

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

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground}></div>
      </div>
    </div>
  );
}

export default Navbar;
