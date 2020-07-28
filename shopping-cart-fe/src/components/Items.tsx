import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import { Container } from '@material-ui/core';
import { Product } from '../redux/model/product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function Items({ loading, products }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3} alignContent="center" justify="center">
          {
            products.map((product: Product, i: number) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  )
}