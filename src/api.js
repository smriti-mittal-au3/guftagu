
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