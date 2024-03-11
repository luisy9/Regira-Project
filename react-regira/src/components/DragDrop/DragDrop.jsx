import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Items } from './Items'

const ItemType = 'ITEM';
const url = 'http://localhost:3000/api/';
const CAIXES = ['doing', 'finished', 'paused', 'not doing']


const Item = ({ id, name, caixa, setTask, task, items, setItems }) => {
    console.log(id, name)

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

    // const colorTask = () => {
    //     if (caixa === 'doing') return 'bg-green-300';
    //     if (caixa === 'finished') return 'bg-yellow-300';
    //     if (caixa === 'paused') return 'bg-sky-400';
    // }

    return (
        <>
            <div
                ref={drag}
                className={`border p-4 mb-4 flex justify-between active:border-[#A68AFA] text-white rounded-lg cursor-grab`}
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <p>{name}</p>
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

    //No me gusta pero funciona
    // const colors = () => {
    //     if (title === 'Do') return 'green';
    //     if (title === 'Decide') return 'yellow';
    //     if (title === 'Delegate') return 'blue';
    // }

    return (
        <div ref={drop} className={`bg-[#292929] p-8 min-h-[400px] border h-full 
        ${isOver ? 'bg-gray-700' : ''}${title === 'Delete' ? 'grid place-content-center' : ''} ${title === 'Delete' && isOver && 'bg-red-600 bg-opacity-15 border-red-600'}`}>
            <h2 className={`text-xl text-center mb-4`}
                style={{color: 'red'}}>{title === 'Delete' ?
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
        console.log(item)
        const nousItems = items.map(it => {
            if (it.id === item) {
                it.estado = caixa;
            }
            return it;
        });
        console.log(nousItems)
        setItems(nousItems)
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        setTask(JSON.parse(storedTasks));
    }, []);

    //Reset Input
    useEffect(() => {
        setValueInput('');
    }, [items])

    const addTodo = (valueInput, valueSelect) => {
        //seteamos el objeto de tasks en el useStore de tasks
        setTask([...task, {
            ['id']: getIdRandom(), ['nom']:
                valueInput, ['caixa']: valueSelect
        }]);
    }

    const getIdRandom = () => {
        return Math.random() * 1000;
    }


    return (
        <DndProvider backend={HTML5Backend}>
            {console.log(items)}
            <div className="w-full flex">
                {
                    CAIXES.map(caixa => (
                        <div className='w-full' key={caixa}>
                            <Box key={caixa} title={caixa} mouItem={mouItem}>
                                {items.filter(item => item.estado === caixa).map(item => (
                                    <Item key={item.id} id={item.id} name={item.titulo} caixa={caixa} setTask={setTask} task={task} items={items} setItems={setItems} />
                                ))}
                            </Box>
                        </div>

                    ))
                }
            </div>
        </DndProvider>
    );
};

export default DragDrop;
