import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CartItem } from '../redux/model/cart';
import { IconButton, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Cookies from 'js-cookie';
import { centsToDollars } from '../util';
import { updateCartItemAdd, updateCartItemRemove, removeCartItem } from '../redux/effects/cart.effects';
import { Product } from '../redux/model/product';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

export interface DrawerItemProps {
  item: CartItem;
}

export default function DrawerItem({ item }: DrawerItemProps) {
  const classes = useStyles();

  const { count, product } = item;

  const dispatch = useDispatch();
  const cartId = Cookies.get('cartId') as string;

  const updateAdd = (product: Product) => {
    dispatch(updateCartItemAdd(product, cartId));
  }

  const updateRemove = (product: Product) => {
    if (count > 1) {
      dispatch(updateCartItemRemove(product, cartId));
    } 
  }

  const removeItem = (product: Product) => {
    dispatch(removeCartItem(product, cartId, count));
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={product.title} src={product.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {centsToDollars(product.price)}
                </Typography>
              </Grid>
              <Grid item>
              <IconButton onClick={() => updateRemove(product)}>
                  <RemoveIcon />
              </IconButton>
              <span>{count}</span>
              <IconButton onClick={() => updateAdd(product)}>
                  <AddIcon />
              </IconButton>
              </Grid>
              <Grid item>
                <Button onClick={() => removeItem(product)}>Remove</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
