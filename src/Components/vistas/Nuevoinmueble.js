import { Breadcrumbs, Button, Container, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { Component } from 'react';
import { consumerFirebase } from '../../Server';
import { crearKeyword } from '../../Sesion/actions/Keywords';
import { openMensajePantalla } from '../../Sesion/actions/snackbarAction';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';



const style = {
	container: {
		paddingTop: '8px'
	},
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		padding: '20px',
		alignItems: "center",
		backgroundColor: 'ffffff'
	},
	homeIcon: {
		width: 20,
		height: 20,
		marginRight: '4px'
	},
	link: {
		display: 'flex'
	},
	submit: {
		marginTop: 15,
		marginBottom: 10
	},
	dropzoneStyle: {
		marginTop: 20,
		marginBottom: 10,
	},
}


class NuevoInmueble extends Component {
	state = {
		inmueble: {
			pais: '',
			ciudad: '',
			direccion: '',
			tipoInmueble: '',
			descripcionInmueble: '',
			fotos: []
		},
		archivos: []
	}

	entraDatoEnEstado = e => {
		let inmueble_ = Object.assign({}, this.state.inmueble)
		inmueble_[e.target.name] = e.target.value
		this.setState({
			inmueble: inmueble_
		})
	};

	//putavida

	guardarInmueble = () => {

		const { archivos, inmueble } = this.state;
		Object.keys(archivos).forEach(function (key) {
			let valorDinamico = Math.floor(new Date().getTime() / 1000);
			let nombre = archivos[key].name;
			let extension = nombre.split(".").pop();
			archivos[key].alias = (nombre.split(".")[0] + "_" + valorDinamico + "." + extension).replace(/\s/g, "_").toLocaleLowerCase();
		})

		const textoBusqueda = inmueble.direccion + ' ' + inmueble.ciudad + ' ' + inmueble.pais + ' ' + inmueble.tipoInmueble;
		let keywords = crearKeyword(textoBusqueda);

		this.props.firebase.guardarFotosInmueble(archivos).then(arregloUrls => {
			inmueble.fotos = arregloUrls;
			inmueble.keywords = keywords;

			this.props.firebase.db
				.collection('Inmuebles')
				.add(inmueble)
				.then(success => {
					this.props.history.push("/");
				})
				.catch(error => {
					openMensajePantalla({
						open: true,
						mensaje: error
					});
				});
		});
	};

	handleChange(archivos) {
		this.setState({
			archivos: archivos
		});
	}

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
								<Typography color="textPrimary">Nuevo Cultivo</Typography>
							</Breadcrumbs>
						</Grid>
						<Grid item xs={6} md={6}>
							<TextField
								name="pais"
								label="Estado"
								fullWidth
								onChange={this.entraDatoEnEstado}
								value={this.state.inmueble.pais}
							/>
						</Grid>

						<Grid item xs={6} md={6}>
							<TextField
								name="ciudad"
								label="Región"
								fullWidth
								onChange={this.entraDatoEnEstado}
								value={this.state.inmueble.ciudad}
							/>
						</Grid>

						<Grid item xs={12} md={12}>
							<TextField
								name="direccion"
								label="Dirección del cultivo"
								fullWidth
								onChange={this.entraDatoEnEstado}
								value={this.state.inmueble.direccion}
							/>
						</Grid>

						<Grid item xs={12} md={12}>
							<TextField
								name="tipoInmueble"
								label="Tipo de cultivo"
								fullWidth
								multiline
								onChange={this.entraDatoEnEstado}
								value={this.state.inmueble.tipoInmueble}
							/>
						</Grid>

						<Grid item xs={12} md={12}>
							<TextField
								name="descripcionInmueble"
								label="Descripción de la siembra"
								fullWidth
								multiline
								onChange={this.entraDatoEnEstado}
								value={this.state.inmueble.descripcion}
							/>
						</Grid>
					</Grid>

					<Grid container fullWidth style={style.dropzoneStyle}>
						<DropzoneArea

							acceptedFiles={['image/*']}
							dropzoneText={"Selecciona o arrastra las imágenes"}
							filesLimit={6}
							onChange={this.handleChange.bind(this)}
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
								style={style.submit}
								onClick={this.guardarInmueble}>
								GUARDAR
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Container>

		);
	}
}

export default consumerFirebase(NuevoInmueble);