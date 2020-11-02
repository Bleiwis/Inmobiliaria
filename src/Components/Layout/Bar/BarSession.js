import React, { Component } from 'react';
import { Toolbar, Typography, Button, IconButton, Drawer, InputBase, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { consumerFirebase } from '../../../Server';
import { compose } from 'recompose';
import { StateContext } from '../../../Sesion/Store';
import { salirSesion } from '../../../Sesion/actions/sesionAction';
import { MenuDerecha } from './Menuderecha';
import { Link, withRouter } from 'react-router-dom';
import { MenuIzquierda } from './MenuIzq';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    listItemText: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "15px",
        color: "#212121"
    },
    list: {
        width: 250
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#61afef",
        '&:hover': {
            backgroundColor: "#61afef",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
class BarSession extends Component {

    static contextType = StateContext;

    state = {
        firebase: null,
        right: false,
        left: false
    }
    salirSesionApp = () => {
        const { firebase } = this.state;
        const [{ sesion }, dispatch] = this.context;
        console.log(firebase)

        salirSesion(dispatch, firebase).then(success => {
            this.props.history.push("/auth/login");
        });
    };
    toggleDrawer = (side, open) => () => {
        this.setState(
            {
                [side]: open
            }
        )
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let nuevosObjetos = {};

        if (nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase;
        }
        return nuevosObjetos;
    }
    render() {
        const { classes } = this.props;
        const [{ sesion }, dispatch] = this.context;
        const { usuario } = sesion;
        let textoUsuario = usuario.nombre + " " + usuario.apellido;
        return (
            <div>

                <Drawer //Menu derecha, version movil
                    open={this.state.right}
                    onClose={this.toggleDrawer("right", false)}
                    anchor="right"
                >
                    <div
                        role="button"
                        onClick={this.toggleDrawer("right", false)}
                        onKeyDown={this.toggleDrawer("right", false)}

                    >
                        <MenuDerecha classes={classes}
                            usuario={usuario}
                            textoUsuario={textoUsuario}
                            fotoUsuario={usuario.foto}
                            salirSesion={this.salirSesionApp}
                        />
                    </div>
                </Drawer>


                <Drawer //menu izquierda, version PC
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    anchor="left"
                >
                    <div
                        role="button"
                        onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)}
                    >
                        <MenuIzquierda 
                            classes={classes}
                            textoUsuario={textoUsuario}
                            fotoUsuario={usuario.foto}
                            
                        //   permisoParaObtenerNotification = {this.recibirNotificaciones}
                        />
                    </div>
                </Drawer>




                <Toolbar>
                    <IconButton color="inherit"
                        onClick={this.toggleDrawer("left", true)} >
                        <i className="material-icons">menu</i>
                    </IconButton>

                    <Typography variant="h6">Prototipo</Typography>

                    <div className={classes.search}>
                        
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                             
                            placeholder="¿Qué estás buscando?"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

              
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" component={Link} to="">
                            <i className="material-icons">mail_outline</i>
                        </IconButton>
                        <Button color="inherit" onClick = {this.salirSesionApp}>Salir</Button>
                        <Button color ="inherit" >{textoUsuario}</Button>
                        <Avatar src={usuario.foto} />


                        
                    </div>


                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit"
                            onClick={this.toggleDrawer("right", true)} >
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default compose(
    withRouter,
    consumerFirebase,
    withStyles(styles)
)(BarSession);