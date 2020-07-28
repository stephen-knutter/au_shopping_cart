import React from 'react';
import { makeStyles, Theme, createStyles, Drawer, Grid, Typography } from '@material-ui/core';
import { CartItem, Cart } from '../redux/model/cart';
import DrawerItem from './DrawerItem';
import { centsToDollars } from '../util';

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'felx',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    items: {
      overflow: 'auto'
    },
    top: {
      top: '56px',
      height: 'calc(100vh - 56px)',
      [theme.breakpoints.up('xs') + ' and (orientation: landscape)']: {
        top: '48px',
        height: 'calc(100vh - 48px)'
      },
      [theme.breakpoints.up('sm')]: {
        top: '64px',
        height: 'calc(100vh - 64px)'
      }
    },
    total: {
      borderTop: '1px solid',
      borderColor: theme.palette.grey[300],
      padding: theme.spacing(1)
    }
  })
);

export interface DrawerProps {
  open: boolean;
  cart: Cart;
}

export default function DrawerRight({ open, cart }: DrawerProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        elevation={65}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paperAnchorDockedRight: classes.top,
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.items}>
          {
            cart.items && cart.items.map((item: CartItem, i: number) => 
              <DrawerItem key={i} item={item} />
            )
          }
        </div>
        <div className={classes.total}>
          <Typography variant="h5">TOTAL: {centsToDollars(cart.total)}</Typography>
        </div>
      </Drawer>
    </div>
  )
}