import React from 'react'

function Alert(props) {
    return (
        props.alert && <div class={`alert alert-${props.alert.type}  alert-dismissible fade show`} role="alert">
            <strong>{props.alert.type==="success"?"Success":"Error"}! </strong>{props.alert.msg}
            
        </div>
    )
}

export default Alert