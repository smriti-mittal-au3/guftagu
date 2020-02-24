import React, {useState} from 'react';
import './Search.scss';
import Toolbar from '../Toolbar';
import {connect} from 'react-redux';
import SearchResult from '../SearchResult';
const fetch = require('../../api')

// no need to pass search results to parent
const Search = (props) => {
    const [state, setState] = useState(
        {
            input:'', 
            id:'',
            user:sessionStorage.getItem('login')? JSON.parse(sessionStorage.getItem('login')):{}
        }
    )



    const onChange = (e) => {
        // if empty, then do nothing
        e.persist()
        console.log("input target value", e)
        let {value} = e.target
        if(value==''){
            console.log("null?", value)

            // and set the state too. otherwise it will keep showing s in input box
            // bcoz value={state.input}
            setState(Object.assign({}, state, {input: value}))
            return
        }
        // set-time-out on every keyup
        // and clear the prev one
        // so store the id in state?
        clearInterval(state.id)
        // shud not be state.input, but e.target.value to fetch latest search, sm not s
        // e will be lost by the time cb gets executed?
        let id = setTimeout(() => fetch.search(props, value), 1000)
        setState(Object.assign({}, state, {input: value, id}))

    }


    return (
        
        <div className='search'>
            <Toolbar redirectTo='/home/profile' img={state.user && state.user.img}/>
            <div className='searchbox'>
                <img className='ml-2 mr-3' id='search-icon' alt='search icon' src='https://cdn1.iconfinder.com/data/icons/hawcons/32/698956-icon-111-search-512.png'></img>
                <input onChange={(e)=> onChange(e)} className='input-contact mb-0 pl-5' value={state.input} type='text' placeholder='Search or start new chat'></input>
            </div>

            {typeof(props.search)==='object'
            ?
            <SearchResult results={props.search} dispatch={props.dispatch}/>
            :
            <SearchResult results={props.contacts} dispatch={props.dispatch} display='d-none'/>}

            


        </div>
    )

}

const stateMap = (state) => {
    return {
        search: state.search,
        contacts: state.contacts
    }

}



export default connect(stateMap)(Search)
