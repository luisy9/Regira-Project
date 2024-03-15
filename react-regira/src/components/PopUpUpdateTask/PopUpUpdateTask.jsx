export const PopUpUpdateTask = ({ closeTag, popUp }) => {
    return (
        <div>
            <button onClick={() => closeTag({...popUp, updateTask: false})}>Close</button>
        </div >
    )
}

export default PopUpUpdateTask
