import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';


export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }


    handleOpen() {
        this.props.handleOpen()
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        this.props.getFiles(files)
        this.props.handleClose()
    }
   
    handleClose() {
        this.setState({
            open: false
        });
    }
    render() {
        return (
            <div>
                <DropzoneDialog
                    open={this.props.open}
                    dialogTitle=''
                    dropzoneText='Selecciona o arrastra tu foto de perfil'
                    filesLimit={1}
                    onClose={this.handleClose.bind(this)}
                    cancelButtonText='Cancelar'
                    submitButtonText='Guardar'
                    previewText=' '
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    showFileNamesInPreview={false}
                    Icon={AddPhotoAlternateIcon}
                    clearOnUnmount={true}

                />
            </div>
        );
    }
}