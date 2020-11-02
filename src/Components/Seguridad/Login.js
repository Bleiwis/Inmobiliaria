import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlineIcon from "@material-ui/icons/LockOpenOutlined";
import { compose } from 'recompose';
import { consumerFirebase } from '../../Server';
import { iniciarSesion } from '../../Sesion/actions/sesionAction';
import { StateContext } from '../../Sesion/Store';
import { openMensajePantalla } from '../../Sesion/actions/snackbarAction';


const style = {
    paper : {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar : {      
        margin: 8,
        backgroundColor : "#e53935"
    },
    form : {
        width: "100%",
        marginTop: 8
    }
}

class Login extends Component {
    static contextType = StateContext;
    state = {
        firebase : null,
        usuario : {
            email : '',
            password : ''
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase){
            return null;
        }
        return {
            firebase : nextProps.firebase
        }
    }
//onChange es un evento, empleado para tomar en cuenta cuando cambia el estado de un objeto
    onChange = e =>{
        let usuario = Object.assign({},this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario : usuario
        })
    }

    login = async e =>{
        e.preventDefault();
        const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;
        const {email, password} = usuario;        
        let  callback = await iniciarSesion(dispatch, firebase, email, password);      
        if(callback.status){
            this.props.history.push("/");
        }else{
            openMensajePantalla(dispatch, {
                open : true,
                mensaje: callback.mensaje.message
                
            });
            
        }
    }
    
    render() {
        
        return (
            <Container maxWidth = "xs">
                <div style = {style.paper}>
                    <Avatar style = {style.avatar}>
                        <LockOutlineIcon />
                    </Avatar>
                    <Typography component = "h1" variant = "h5">
                        Inicia sesión
                    </Typography>
                    <form style = {style.form}>
                        <TextField
                        variant = "outlined"  
                        fullWidth margin="dense"                        
                        label = "Correo electrónico" 
                        name = "email"
                        onChange = {this.onChange}
                        value = {this.state.usuario.email} 
                        />

                        <TextField
                        variant = "outlined"  
                        fullWidth margin="dense"                        
                        type = "password"
                        label = "Contraseña" 
                        name = "password"
                        onChange = {this.onChange} 
                        value = {this.state.usuario.password}
                        />

                        <Button type= "submit" 
                        fullWidth 
                        variant ="contained" 
                        color = "primary"
                        onClick={this.login}>
                        
                            EMPEZAR
                            
                        </Button>
                        
                    </form>

                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase)(Login);