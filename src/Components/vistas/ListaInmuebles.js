import React, { Component } from 'react';
import { Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, InputAdornment, Link, Paper, TextField, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import logo from '../../logo.svg';
import { consumerFirebase } from '../../Server';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
const style = {
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8
  },
  paper: {
    backgroundColor: "#ffffff",
    padding: "20px",
    minHeight: 550
  },
  link: {
    display: "flex"
  },
  gridTextfield: {
    marginTop: "20px"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
}

class ListaInmuebles extends Component {
  state = {
    inmuebles: [],
    textoBusqueda: ""
  }

  cambiarBusquedaTexto = e => {
    const self = this;
    self.setState({
      [e.target.name]: e.target.value
    })

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      name: e.target.value,
      typing: false,
      typingTimeout: setTimeout(goTime => {


        let objectQuery = this.props.firebase.db
          .collection("Inmuebles")
          .orderBy("direccion")
          .where("keywords", "array-contains", self.state.textoBusqueda.toLowerCase());

        if (self.state.textoBusqueda.trim() === "") {
          objectQuery = this.props.firebase.db
            .collection("Inmuebles")
            .orderBy("direccion")
        }

        objectQuery.get().then(snapshot => {
          const arrayInmueble = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return { id, ...data };
          })
          this.setState({
            inmuebles: arrayInmueble
          })
        })
      }, 500)
    })
  }
  async componentDidMount() {
    let objectQuery = this.props.firebase.db.collection('Inmuebles').orderBy('direccion');

    const snapshot = await objectQuery.get();

    const arrayInmueble = snapshot.docs.map(doc => {
      let data = doc.data();
      let id = doc.id;
      return { id, ...data };
    })

    this.setState({
      inmuebles: arrayInmueble
    })
  }

  eliminarInmueble = id => {
    this.props.firebase.db
      .collection("Inmuebles")
      .doc(id)
      .delete()
      .then(success => {
        this.eliminarInmuebleDeListaEstado(id);
      })
  }

  eliminarInmuebleDeListaEstado = id => {
    const inmuebleListaNueva = this.state.inmuebles.filter(
      inmueble => inmueble.id !== id
    )
    this.setState({
      inmuebles: inmuebleListaNueva
    })
  }
  editarInmueble = id => {
    this.props.history.push("auth/id" + id)
  }


  render() {
    return (
      <Container style={style.cardGrid}>
        <Paper style={style.paper}>
          <Grid item xs={12} sm={12}>
            <Breadcrumbs aria-label="breadcrumbs">
              <Link color="inherit" style={style.link} href="/">
                <HomeIcon /> Inicio
            </Link>
              <Typography color="textPrimary">Mis Cultivos</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sm={6} style={style.gridTextfield}>
            <TextField
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              name="textoBusqueda"
              variant="outlined"
              label="Ingrese el cultivo a buscar"
              placeholder="Puedes buscar por estado, dirección o cultivo"
              onChange={this.cambiarBusquedaTexto}
              value={this.state.textoBusqueda}
              inputProps={{
                startAdorment:(
                  <InputAdornment position ='start'>
                    <SearchRoundedIcon/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} style={style.gridTextfield} >
            <Grid container spacing={4}>
              {this.state.inmuebles.map(card => (
                <Grid item key={card.id} xs={12} sm={4}>
                  <Card style={style.card} elevation={3}>
                    <CardMedia style={style.cardMedia}
                      image={
                        card.fotos
                          ? card.fotos[0]
                            ? card.fotos[0]
                            : logo
                          : logo}
                      title="Mi Cultivo" />

                    <CardContent style={style.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.ciudad + ", " + card.pais}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        onClick={() => this.editarInmueble(card.id)}
                        size="small"
                        color="primary"
                      >

                        Editar
                        </Button>

                      <Button
                        size="small"
                        color="primary"
                        //onClick={handleOpen}
                        onClick={() => this.eliminarInmueble(card.id)}
                      >

                        Eliminar
                        </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default consumerFirebase(ListaInmuebles);


















/*import React, { Component, useState, useEffect } from 'react';
import { consumerFirebase } from '../../Server';
import { Breadcrumbs, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const style = {
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8
  },
  paper: {
    backgroundColor: "#ffffff",
    padding: "20px",
    minHeight: 550
  },
  link: {
    display: "flex"
  },
  gridTextfield: {
    marginTop: "20px"
  }
}
const ListaInmuebles = (props) => {

  const [inmuebles, setinmuebles] = useState([]);
  const [valores, setvalores] = useState({
    textoBusqueda: ''
  });


  return (
    <Container style={style.cardGrid}>
      <Paper style={style.paper}>
        <Grid item xs={12} sm={12}>
          <Breadcrumbs aria-label="breadcrumbs">
            <Link color="inherit" style={style.link} href="/">
              <HomeIcon /> Inicio
            </Link>
            <Typography color="textPrimary">Mis Inmuebles</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={12} style={style.gridTextfield}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            name="textoBusqueda"
            variant="outlined"
            label="Ingrese el inmueble a buscar"
            onChange={valores.textoBusqueda}>
          </TextField>
        </Grid>
      </Paper>
    </Container>
  )
}

export default consumerFirebase(ListaInmuebles);*/