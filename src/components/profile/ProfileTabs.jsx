import { useProfileTabsStyles } from '@/styles';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { GridIcon } from '@/icons';

function ProfileTabs({ user, isOwner }) {
  const classes = useProfileTabsStyles();
  const [value, setValue] = useState(0);

  return (
    <>
      <section className={classes.section}>
        <Box sx={{ display: { md: 'block', xs: 'none' } }}>
          <Divider />
        </Box>
        <Box sx={{ display: { md: 'block', xs: 'none' } }}>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              icon={<span className={classes.postsIconLarge} />}
              label="POSTS"
              classes={{
                root: classes.tabRoot,
                labelIcon: classes.tabLabelIcon,
                wrapper: classes.tabWrapper,
              }}
            />
            {isOwner && (
              <Tab
                icon={<span className={classes.savedIconLarge} />}
                label="SAVED"
                classes={{
                  root: classes.tabRoot,
                  labelIcon: classes.tabLabelIcon,
                  wrapper: classes.tabWrapper,
                }}
              />
            )}
          </Tabs>
        </Box>
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          <Tabs
            value={value}
            onChange={(_, value) => setValue(value)}
            centered
            className={classes.tabs}
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab
              icon={<GridIcon fill={value === 0 ? '#3897f0' : undefined} />}
              classes={{ root: classes.tabRoot }}
            />

            {isOwner && (
              <Tabs
                icon={<GridIcon fill={value === 1 ? '#3897f0' : undefined} />}
                classes={{ root: classes.tabRoot }}
              />
            )}
          </Tabs>
        </Box>
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          {user.posts.length === 0 && <Divider />}
        </Box>
      </section>
    </>
  );
}

export default ProfileTabs;
