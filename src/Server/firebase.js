import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB9BHEnW5w1DbBr5_bEqzefwA76sw3DYY8",
    authDomain: "home-48c6b.firebaseapp.com",
    databaseURL: "https://home-48c6b.firebaseio.com",
    projectId: "home-48c6b",
    storageBucket: "home-48c6b.appspot.com",
    messagingSenderId: "1015388865182",
    appId: "1:1015388865182:web:6f9934b627b42bdc3a318f",
    measurementId: "G-M5042SGZSX"
};

class Firebase {

    constructor() {

        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();

        this.storage.ref().constructor.prototype.guardarFotosInmueble = function (subirFotos) {
            var ref = this;
            return Promise.all(subirFotos.map(function (file) {
                return ref.child(file.alias).put(file).then(snapshot => {
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }
    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarFotosInmueble = (subirFotos) => this.storage.ref().guardarFotosInmueble(subirFotos);

}


export default Firebase;