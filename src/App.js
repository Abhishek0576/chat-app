import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBA0CWA4Wxi9G11E8S5FUrItltCxnXdWL0",
  authDomain: "chat-app-c9441.firebaseapp.com",
  projectId: "chat-app-c9441",
  storageBucket: "chat-app-c9441.appspot.com",
  messagingSenderId: "811896013745",
  appId: "1:811896013745:web:83dc588db2dd88fe0a3390"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {

    const [user] = useAuthState(auth);

    return(
        <div className="App">
            <header>

            </header>
            
            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return(
       <button onClick={signInWithGoogle}>SignIn with Google</button> 
    )
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>SignOut</button>
    )
}

function ChatRoom() {

    const dummy = useRef();

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');   
    
    const sendMessage = async(e) => {
        e.preventDefault();
        
        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimeStamp(),
            uid,
            photoURL
        });

        setFormValue('');

        dummy.current.scrollIntoView({behavior:'smooth' });
    }

    return(
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
            
                <div ref={dummy}>

                </div>

            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type="submit">send</button>
            </form>

        </>
    );
}

function ChatMessage(props) {
    const {text, uid, photoURL} = props.message;
    
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

    return(
        <div className={`message ${messageClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
        </div>    
    );
}

export default App;