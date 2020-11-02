import React from 'react';
import { Avatar, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { StateContext } from '../../../Sesion/Store';
import {Link} from 'react-router-dom';


export const MenuIzquierda = ({ classes, usuario, textoUsuario, fotoUsuario, salirSesion }) => (

    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to="/auth/uprofile">
                <Avatar src={fotoUsuario}/>
               
                <ListItemText classes={{ primary: classes.ListItemText }} primary={"¡Hola " + textoUsuario + "!"} ></ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/auth/nuevoinmueble">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Nuevo Inmueble" ></ListItemText>
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">business</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Inmuebles" ></ListItemText>
            </ListItem>
            <ListItem component={Link} button to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{ primary: classes.ListItemText }} primary="Mensajes" ></ListItemText>
            </ListItem>
        </List>
    </div>

)