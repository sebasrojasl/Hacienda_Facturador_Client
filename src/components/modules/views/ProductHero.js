import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://c.pxhere.com/photos/c0/87/cup_device_drink_feminine_flat_lay_flatlay_fruits_hands-1524945.jpg!d';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#283593', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Empieza a factuar de forma fácil y sencilla
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Ahorrate pasos innecesarios y empieza a facturar hoy mismo.
      </Typography>
      <Button
        color="#bbdefb"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/registro"
      >
        Registrarse
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Totalmente customizable
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
