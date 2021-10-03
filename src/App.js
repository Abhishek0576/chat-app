import {ChatEngine} from 'react-chat-engine';
import './App.css';

import { ChatFeed } from './components/ChatFeed';

const App = () => {
    return(
        <ChatEngine
            height="100vh"
            projectID="418f00f6-fcda-4b67-a960-e06f209b4f86"   
            userName="abkstar"
            userSecret="123456"
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} /> }
        />
    )
}

export default App;