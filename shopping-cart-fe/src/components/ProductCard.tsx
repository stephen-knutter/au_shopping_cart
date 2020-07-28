import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Product } from '../redux/model/product';
import { useDispatch } from 'react-redux';
import { addItemToCart , createNewCart } from '../redux/effects/cart.effects';
import Cookies from 'js-cookie';
import { centsToDollars } from '../util';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative'
  },
  media: {
    height: 250,
    width: 250,
    margin: '0 auto'
  },
  button: {
    color: theme.palette.common.white
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

export default function ProductCard({ product }: any) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const addToCart = (product: Product) => {
    const cartId = Cookies.get('cartId');
    if (cartId) {
      // update current cart
      dispatch(addItemToCart (product, cartId));
    } else {
      // create new cart
      dispatch(createNewCart(product));
    }
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {centsToDollars(product.price)}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
        onClick={() => addToCart(product)}
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
      >
        Add to cart
      </Button>
      </CardActions>
    </Card>
  );
}
