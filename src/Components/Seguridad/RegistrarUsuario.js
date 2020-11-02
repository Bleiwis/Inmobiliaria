import React, { Component } from 'react';
import { Container, Typography, Grid, TextField, Avatar, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOpenOutlined';
import { compose } from 'recompose';
import { consumerFirebase } from '../../Server';
import { crearUsuario } from '../../Sesion/actions/sesionAction';
import { StateContext } from '../../Sesion/Store';
import { openMensajePantalla } from '../../Sesion/actions/snackbarAction';


const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "#e53935"
    },
    form: {
        width: "100%",
        marginTop: 20
    },
    submit: {
        marginTop: 15,
        marginBottom: 20
    }
}

class RegistrarUsuario extends Component {
    static contextType = StateContext;
    state = {
        usuario: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.firebase === prevState.firebase) {
            return null;
        }
        return {
            firebase: nextProps.firebase
        }
    }
    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario: usuario
        })
    }

    //Extructura para almacenar y registrar usuarios dentro de Firebase
    RegistrarUsuario = async e => {
        e.preventDefault();
        const [{ sesion }, dispatch] = this.context; //state global
        const { firebase, usuario } = this.state; // state local
        let callback = await crearUsuario(dispatch, firebase, usuario);
        if (callback.status) {
            this.props.history.push("/")
        } else {
            openMensajePantalla(dispatch, {
                open: true,
                mensaje: callback.mensaje.message
            })
        }
    }
    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registre su cuenta
                    </Typography>
                    <form style={style.form}>
                        <Grid container spacing={1}>

                            <Grid item md={12} xs={12}>
                                <TextField
                                    variant="outlined"
                                    name="nombre"
                                    onChange={this.onChange}
                                    value={this.state.usuario.nombre}
                                    fullWidth label="Ingrese su nombre" />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <TextField
                                    variant="outlined"
                                    name="apellido"
                                    onChange={this.onChange}
                                    value={this.state.usuario.apellido}
                                    fullWidth label="Ingrese sus apellidos" />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <TextField
                                    variant="outlined"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.usuario.email}
                                    fullWidth label="Ingrese su e-mail" />
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={this.state.usuario.password}
                                    fullWidth label="Ingrese su contraseña" />
                            </Grid>

                        </Grid>
                        <Grid container justify="center">
                            <Grid item xs={12} md={6}>
                                <Button
                                    type="submit"
                                    onClick={this.RegistrarUsuario}
                                    variant="outlined"
                                    fullWidth size="large"
                                    color="primary"
                                    style={style.submit}>

                                    Registrar

                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase)(RegistrarUsuario);