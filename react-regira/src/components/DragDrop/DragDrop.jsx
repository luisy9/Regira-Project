import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Items } from './Items'
import AddItem from './AddItem';

const ItemType = 'ITEM';
const url = 'http://localhost:3000/api/';
const CAIXES = ['doing', 'finished', 'paused', 'not doing']


const Item = ({ id, item, caixa, setTask, task, items, setItems }) => {

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { type: ItemType, id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    // const deleteTask = (id) => {
    //     const deleteTask = task.filter(e => e.id !== id);
    //     setTask(deleteTask);
    // }

    const colorTask = () => {
        if (item.prioridad === 'High') return 'bg-red-400';
        if (item.prioridad === 'Medium') return 'bg-yellow-400';
        if (item.prioridad === 'Low') return 'bg-sky-400';
    }

    return (
        <>
            <div
                ref={drag}
                className={`border shadow-lg px-3 py-1 mb-4 w-full h-40 active:border-2 active:border-[#2681FF] text-black rounded-md cursor-grab`}
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <h1 className='text-bold text-2xl'>{item.tipo}</h1>
                <p className='text-sm'>{item.titulo}</p>
                <div className={`my-2 border w-fit px-1 rounded-md ${colorTask()}`}>
                    <p>{item.prioridad}</p>
                </div>
            </div>
        </>
    );
};

const Box = ({ children, title, mouItem }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            // Obtenir el nom del item que s'ha deixat anar
            const itemName = item.id;
            // Obtain el nom de la caixa on es deixa anar
            const containerTitle = title;
            // Moure l'item d'un lloc a l'altre
            mouItem(itemName, containerTitle)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`bg-[#F7F8F9] p-8 min-h-[400px] border rounded-md h-full ${isOver ? 'border-[#2681FF]' : ''}${title === 'Delete' ? 'grid place-content-center' : ''} ${title === 'Delete' && isOver && 'bg-red-600 bg-opacity-15 border-red-600'}`}>
            <h2 className={`text-2xl text-start mb-4 text-bold`}>{title === 'Delete' ?
                <img src='/eliminar.png' alt='delete' className='w-12 h-12' />
                : `${title}`}</h2>
            {children}
        </div>
    );
};

export const DragDrop = ({ allProjectTasks, id }) => {
    const [items, setItems] = useState(allProjectTasks);

    const [task, setTask] = useState([]);
    const [valueInput, setValueInput] = useState('');

    // funció que "Mou" un element d'una caixa a l'altra
    const mouItem = (item, caixa) => {
        const nousItems = items.map(it => {
            if (it.id === item) {
                it.estado = caixa;
            }
            return it;
        });
        // setItems(nousItems)
        setTask(nousItems);
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        setTask(JSON.parse(storedTasks));
    }, []);

    //Reset Input
    useEffect(() => {
        //localStorage
        const opcions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        };
        fetch(url + 'tarea', opcions)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        setValueInput('');
    }, [task]);

    // const addTodo = (valueInput, valueSelect) => {
    //     //seteamos el objeto de tasks en el useStore de tasks
    //     setTask([...task, {
    //         ['id']: getIdRandom(), ['nom']:
    //             valueInput, ['caixa']: valueSelect
    //     }]);
    // }

    // const getIdRandom = () => {
    //     return Math.random() * 1000;
    // }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full flex gap-5">
                {
                    CAIXES.map(caixa => (
                        <div className='w-full' key={caixa}>
                            <Box key={caixa} title={caixa} mouItem={mouItem}>
                                {items ? items.filter(item => item.estado === caixa).map(item => (
                                    <>
                                        <Item key={item.id} id={item.id} item={item}
                                            caixa={caixa} setTask={setTask} task={task}
                                            items={items} setItems={setItems} />
                                        <AddItem id={caixa} />
                                    </>
                                )) : []}
                            </Box>
                        </div>
                    ))
                }
            </div>
        </DndProvider>
    );
};

export default DragDrop;
