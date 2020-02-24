import React from 'react';
import {connect} from 'react-redux';
import './SearchResult.scss';


const SearchResult = ({results, display, dispatch}) => {
    console.log("inside search results :", results)

    const onClick = (e, result) => {
        // console.log(e.target)
        // const {nodeName} = e.target 
        // if(nodeName==='LI'){
        e.target.style.background = '#eeeeef'
        console.log(result)
        dispatch({type:"get-chat-content-for-selected-chat", value: result})
        // }

    }

    return (
    <div className='w-100 search-result'>
        <ul className={`list-group list-group-flush ${display}`}>
            <li className="list-group-item"><p className='mb-0'>CHATS</p></li>
        </ul>
        <ul className="list-group list-group-flush">
            {results.length!==0
            ? 
            results.map((result, key) => {
                const {email, username, img} = result
                return (
                    <li onClick={e => onClick(e, result)} key={email} className="list-group-item">
                        <img className='mr-5' src={img} alt='avatar'/>
                        <p className='mb-0'>{username}</p>
                    </li>
                ) 
            })
            : 
            <li className={`mt-4 list-unstyled text-center text-secondary ${display}`}>No users found</li>
            }
        </ul>
    </div>

    )
}


export default connect()(SearchResult)


