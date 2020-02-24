import Toolbar from '../Toolbar';
import ChatHistory from '../ChatHistory';
import TypeMessage from '../TypeMessage';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './ChatPanel.scss'

const io = require('socket.io-client');
const ENDPOINT = 'localhost:8000';
const login = sessionStorage.getItem('login')? JSON.parse(sessionStorage.getItem('login')): ''
// it re-connects on every refresh. => put inside componenet def. or put it in a diff useEffect. YES!
// let socket = io(ENDPOINT); 
let socket
const ChatPanel = ({room: {username, img}}) => {

    // let socket = io(ENDPOINT); 

    // const login = sessionStorage.getItem('login')? JSON.parse(sessionStorage.getItem('login')): ''
    console.log("login: ", login)
    // const [user, setUser] = useState(login.username)
    const [name] = useState(login.username)
    // room = selected chat username
    const [text, setText] = useState('') //for input box
    const [messages, setMessages] = useState([])
    console.log(messages)
    // define socket outside. so that its accessible in other func
    // useEffect(() => {
    //     // socket = io(ENDPOINT); 

    //     return () => socket.off()

    // }, [login.email])

    useEffect(() => {
        // console.log("new chat selected", name, login.email)
        socket = io(ENDPOINT)
        // console.log(socket)
        // setName(loggedinUser)
        // setchattingWith(username)
        // console.log(loggedinUser, props.selectedChat.email)
        socket.emit('join', {name, username}, setMessages)


    }, [name, username]) //had to use this. [room] didn;t work


    useEffect(()=>{
        socket.on('message', (message, setDisplay) => {
            setMessages([...messages, message])
        })
    }, [messages])



    useEffect(()=>{
        return () => {
            // socket.emit('storeChats', to, from)
            socket.emit('disconnect')
        }
    })


    const sendMessage =(e) => {
        e.preventDefault()
        console.log("#62 chatpanel:", name, username, text)
        if(text){
            socket.emit('sendMessage', name, username, text, () => setText(''))
        }
    }



    return (
    <div className='content w-100'>
        <Toolbar img={img} username={username} display='d-none' />
        <ChatHistory messages={messages} name={name} />
        <TypeMessage message={text} setMessage={setText} sendMessage={sendMessage} />
    </div>)

}


const mapState = state => {
    return {
        room : state.room
    }
}


export default connect(mapState)(ChatPanel)
