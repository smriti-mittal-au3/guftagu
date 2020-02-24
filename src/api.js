//changed here
 module.exports.accounts = (ref1, ref2, props, data) => {
    fetch('http://localhost:8000/accounts', {
        method:'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/text'},
        body: JSON.stringify(data)
    })
    .then((response) => {
        console.log(response);
        if(response.ok)
            return response.text()
        else{
            throw Error(response.statusText)  

        }
    }
    )
    .then(()=> {
        // ref1.current.nextSibling.style.opacity=0.1
        ref1.current.classList.remove('d-none')
        setTimeout(()=>{
            ref1.current.classList.add('d-none')
            ref1.current.nextSibling.style.opacity=1
            const redirect = data.token? '/home':'/login'
            props.history.push(redirect)
        }, 1000)

        }
    )
    .catch((err)=> {
        console.log(err)
        ref2.current.classList.remove('d-none')
        setTimeout(()=>{
            ref2.current.classList.add('d-none')
            ref1.current.nextSibling.style.opacity=1
            props.history.push('/')
        }, 1000)

    })
}

module.exports.login =(props,data)=>{
    fetch('http://localhost:8000/login',{
        method:"POST",
        headers: {'Content-Type': 'application/json', 'Accept': 'application/text'},
        body: JSON.stringify(data)
    })
    .then((response)=>{
      if(response.ok){
          console.log("login successful")
          props.history.push('/home')
          return response.json()
      }  else{
          throw Error(response.statusText)
      }
    })
    .then(res => {
        // store in locatstorage
        sessionStorage.setItem('login', JSON.stringify(res))
    })
    .catch((err)=> {
        console.log("login not successful",err)
        //ref2.current.classList.remove('d-none')
        setTimeout(()=>{
            //ref2.current.classList.add('d-none')
            //ref1.current.nextSibling.style.opacity=1
            props.history.push('/login')
        }, 1000)

    })
}



module.exports.search = (props, search) => {
    console.log("inside search api.js", search)
    fetch(`http://localhost:8000/search/${search}`)
    .then((res) => res.json())
    .then(res => {
        console.log(res)
        props.dispatch({type:"searched users", value:res.results})

    })
    .catch(err => {
        console.log(err)
        props.history.push('/home')
    })

}


module.exports.contacts = (dispatch, from) => {
    fetch(`http://localhost:8000/contacts/${from}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        dispatch({type:"contacts", value:res.results})
    })
    .catch(err => {
        console.log(err)
        
    })
}
