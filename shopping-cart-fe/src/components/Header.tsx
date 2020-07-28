import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Typography, makeStyles, Theme, createStyles, Container, Badge } from '@material-ui/core';
import DrawerRight from './Drawer';
import { useSelector } from 'react-redux';
import { CartState } from '../redux/model/cart';
import { ProductState } from '../redux/model/product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    }
  })
);

export default function Header() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState('0');

  const cart = useSelector((state: CartState) => state.cart);

  React.useEffect(() => {
    const count = cart
      && cart.items
      && cart.items.length.toString()
      || '0';
    setCount(count);
  }, [cart]);

  const toggleMenu = () => {
    const isOpen = !open;
    setOpen(isOpen);
  }

  return (
    <div>
      <AppBar
        position="fixed"
        color="default"
      >
        <Container maxWidth="xl">
          <Toolbar>
              <Typography variant="h5">OutdoorStuff.com</Typography>&nbsp;<DirectionsBikeIcon color="primary" />
              <div className={classes.grow}></div>
              <IconButton aria-label="cart" color="inherit" onClick={toggleMenu}>
                <Badge badgeContent={count} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              { !!cart.total && <strong>Cart</strong>}
              { cart.items && !cart.items.length && <strong>Your cart is empty</strong>}
          </Toolbar>
          <DrawerRight open={open} cart={cart}  />
        </Container>
      </AppBar>
    </div>
  )
}