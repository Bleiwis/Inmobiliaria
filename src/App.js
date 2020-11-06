import React, { Component, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "./App.css";
import AppNavBar from "./Components/Layout/AppNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, Snackbar } from '@material-ui/core';
import theme from "./Theme/theme";
import RegistrarUsuario from './Components/Seguridad/RegistrarUsuario';
import Login from "./Components/Seguridad/Login";
import { FirebaseContext } from './Server';
import { useStateValue } from './Sesion/Store';
import RutaAutenticada from "./Components/Seguridad/RutaAutenticada";
import PerfilUsuario from "./Components/Seguridad/PerfilUsuario";
import NuevoInmueble from "./Components/vistas/Nuevoinmueble";
import ListaInmuebles from "./Components/vistas/ListaInmuebles";
import EditarInmueble from "./Components/vistas/EditarInmueble";






function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{ openSnackbar }, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    })
  });
  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })
        }
      >
      </Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />

          <Grid container>
            <Switch>
              <RutaAutenticada
                exact path="/"
                autenticadoFirebase={firebase.auth.currentUser}
                component={ListaInmuebles} />
              <RutaAutenticada
                exact path="/auth/uprofile"
                autenticadoFirebase={firebase.auth.currentUser}
                component={PerfilUsuario} />
              <RutaAutenticada
                exact path="/auth/nuevoinmueble"
                autenticadoFirebase={firebase.auth.currentUser}
                component={NuevoInmueble} />
                <RutaAutenticada
                exact path="/auth/:id"
                autenticadoFirebase={firebase.auth.currentUser}
                component={EditarInmueble} />

              <Route path="/auth/registrarUsuario" exact component={RegistrarUsuario}></Route>
              <Route path="/auth/login" exact component={Login}></Route>
              

            </Switch>
          </Grid>

        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  )
    : null
    ;


}



export default App;
