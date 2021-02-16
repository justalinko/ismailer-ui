import './button.css'

const Button = ({button} : ButtonProps) =>{
    
        return(
            <div className="text-left">
                <button className="button" >{button}</button>
            </div>
        )
    
}

export{ Button }
export type ButtonProps = {
    button : string
}