import { Breadcrumbs, Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { consumerFirebase } from '../../Server';
import HomeIcon from '@material-ui/icons/Home'
import { DropzoneArea } from 'material-ui-dropzone';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const style = {
  container: {
    paddingTop: "8px"
  },
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#ffffff"
  },
  link: {
    padding: "20px",
    backgroundColor: "#ffffff"
  },
  homeIcon: {
    width: 20,
    height: 20,
    marginRight: "4px"
  }
}
class EditarInmueble extends Component {

  state = {
    inmueble: {
      pais: '',
      ciudad: '',
      direccion: '',
      tipoInmueble: '',
      descripcionInmueble: '',
      fotos: []
    },

  }

  //Asignar estado de los componentes
  cambiarDato = e => {
    let inmueble = Object.assign({}, this.state.inmueble)
    inmueble[e.target.name] = e.target.value
    this.setState({ inmueble });
  }

 /* async componentDidMount() {
    const {id} = this.props.match.params;
    
    const inmuebleCollection = this.props.firebase.db.collection("Inmuebles");
    const inmuebleDB = await inmuebleCollection.doc(id).get();

    this.setState({
        inmueble : inmuebleDB.data()
    })

}  */

  render() {

    return (
      <Container style={style.container}>
        <Paper style={style.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" style={style.link} href="/">
                  <HomeIcon style={style.homeIcon} />Inicio
              </Link>
                <Typography color="textPrimary">Editar Cultivo</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                name="pais"
                label="Estado"
                fullWidth
                onChange={this.cambiarDato}
                value={this.state.inmueble.pais}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                name="ciudad"
                label="Región"
                fullWidth
                onChange={this.cambiarDato}
                value={this.state.inmueble.ciudad}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="direccion"
                label="Dirección del cultivo"
                fullWidth
                onChange={this.cambiarDato}
                value={this.state.inmueble.direccion}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="tipoInmueble"
                label="Tipo de cultivo"
                fullWidth
                multiline
                onChange={this.cambiarDato}
                value={this.state.inmueble.tipoInmueble}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name="descripcionInmueble"
                label="Descripción de la siembra"
                fullWidth
                multiline
                onChange={this.cambiarDato}
                value={this.state.inmueble.descripcionInmueble}
              />
            </Grid>
          </Grid>

          <Grid container fullWidth style={style.dropzoneStyle}>
            <DropzoneArea

              acceptedFiles={['image/*']}
              dropzoneText={"Selecciona o arrastra las imágenes"}
              filesLimit={6}
              //     onChange={this.handleChange.bind(this)}
              showPreviews={true}
              showPreviewsInDropzone={false}
              showFileNamesInPreview={false}
              Icon={AddPhotoAlternateIcon}

            />
          </Grid>

          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
              //style={style.submit}
              //onClick={this.guardarInmueble}
              >
                GUARDAR
            </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default consumerFirebase(EditarInmueble);