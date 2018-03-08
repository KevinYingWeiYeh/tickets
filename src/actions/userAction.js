import { auth, googleProvider, facebookProvider} from '../firebase';

export function googleLogin() {
    return dispatch => auth.signInWithPopup(googleProvider).then(function(result) {
	 // This gives you a Google Access Token.
	 var token = result.credential.accessToken;
	 // The signed-in user info.
	 var user = result.user;
	 console.log('token',token,' user',user, result)
	});
}

export function facebookLogin() {
	console.log('login with facebook')
    return dispatch => auth.signInWithPopup(facebookProvider).then(function(result) {
	 // This gives you a Google Access Token.
	 var token = result.credential.accessToken;
	 // The signed-in user info.
	 var user = result.user;
	 console.log('token',token,' user',user, result)
	});
}

export function passwordLogin(email, password) {
	console.log('user email login',email, password)
	auth.signInWithEmailAndPassword(email, password).then(function(message){
		console.log('message:',message)
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
		console.log('errors:',errorCode,errorMessage)
	});
}