import React from 'react';
import { useState, useEffect } from 'react';
import { useStateValue } from "../../Sesion/Store";
import { Avatar, Button, Container, Grid, Breadcrumbs, TextField, Typography, Paper } from "@material-ui/core";
import { consumerFirebase } from '../../Server';
import { openMensajePantalla } from '../../Sesion/actions/snackbarAction';
import { v4 as uuidv4 } from 'uuid';
import { DropzoneDialog } from 'material-ui-dropzone';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'


const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    borderRadius: "10px",

  },
  breadcrumbs: {
    backgroundColor: "#ffffff",
    display: "flex",
    padding: "20px",
    borderRadius: "12px",

  },
  form: {
    width: "100%",
    marginTop: 20
  },
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  submit: {
    marginTop: 15,
    marginBottom: 20
  }
};


const PerfilUsuario = props => {
  const [{ sesion }, dispatch] = useStateValue();
  const firebase = props.firebase;
  let [estado, cambiarEstado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    id: ""
  });

  const cambiarDato = e => {
    const { name, value } = e.target;
    cambiarEstado(prev => ({
      ...prev, [name]: value
    }))
  }
  const guardarCambios = e => {
    e.preventDefault();
    firebase.db
      .collection("Users")
      .doc(firebase.auth.currentUser.uid)
      .set(estado, { merge: true })
      .then(success => {
        dispatch({
          type: 'INICIAR_SESION',
          sesion: estado,
          autenticado: true
        })
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: "Se guardaron los cambios"
        })
      })
      .catch(error => {
        openMensajePantalla(dispatch, {
          open: true,
          mensaje: "Se ha producido un error" + error
        })
      })
  }
  const validarEstadoFormulario = sesion => {
    if (sesion) {
      cambiarEstado(sesion.usuario);
    }
  }

  useEffect(() => {
    if (estado.id === "") {
      validarEstadoFormulario(sesion);
    }
  })
  const subirFoto = fotos => {
    //1 Subir imágen
    const foto = fotos[0];
    //generar clave unica para la foto
    const claveUnicaFoto = uuidv4();
    // get foto name
    const nombreFoto = foto.name;
    //get img extension
    const extensionFoto = nombreFoto.split('.').pop();
    //rename foto 
    const alias = (nombreFoto.split('.')[0] + '_' + claveUnicaFoto + '.' + extensionFoto).replace(/\s/g, '_').toLocaleLowerCase();
    firebase.guardarDocumento(alias, foto).then(metadata => {
      firebase.devolverDocumento(alias).then(urlFoto => {
        estado.foto = urlFoto;
        firebase.db
          .collection('Users')
          .doc(firebase.auth.currentUser.uid)
          .set({ foto: urlFoto }, { merge: true })
          .then(userDB => {
            dispatch({
              type: 'INICIAR_SESION',
              sesion: estado,
              autenticado: true
            })
          })
      })
    })
  }

  const [open, setOpen] = useState(false);



  return (sesion ? (
    <Container component="main" maxWidth="xs" justify="center" >
      <div style={style.paper}>
        <Avatar style={style.avatar} src={estado.foto} onClick={() => setOpen(true)} />
        <Typography component="h1" variant="h5">Perfil de la cuenta</Typography>
        <Paper style={style.paper}>
          <Breadcrumbs aria-label="breadcrumb" style={style.breadcrumbs}>
            <form style={style.form}>
              <Grid container width="xs" spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="nombre"
                    variant="outlined"
                    fullWidth
                    label="Nombre"
                    value={estado.nombre}
                    onChange={cambiarDato}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="apellido"
                    variant="outlined"
                    fullWidth
                    label="Apellido"
                    value={estado.apellido}
                    onChange={cambiarDato}

                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    label="Correo Electrónico"
                    value={estado.email}
                    onChange={cambiarDato}
                  />

                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    name="telefono"
                    variant="outlined"
                    fullWidth
                    label="Teléfono"
                    value={estado.telefono}
                    onChange={cambiarDato}
                  />
                </Grid>

              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    style={style.submit}
                    onClick={guardarCambios}>
                    Guardar
                            </Button>
                </Grid>
              </Grid>

            </form>
          </Breadcrumbs>
        </Paper>
      </div>
      <DropzoneDialog
        dialogTitle=''
        filesLimit={1}
        dropzoneText='Selecciona o arrastra tu foto de perfil'
        previewText=' '
        Icon={AddPhotoAlternateIcon}
        acceptedFiles={['image/*']}
        cancelButtonText={"Cancelar"}
        submitButtonText={"Guardar"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={subirFoto}
        showPreviews={false}
        showPreviewsInDropzone={true}
        showFileNamesInPreview={false}

      />


    </Container>


  )
    : null);
};

export default consumerFirebase(PerfilUsuario);
