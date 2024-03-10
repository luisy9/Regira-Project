import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { ShowTasksProject } from './ShowTasksProject';
import { BoxTasks } from './BoxTasks'

export const DragDrop = ({ allProjectTasks }) => {
  console.log(allProjectTasks)
  // const [items, setItems] = useState(allProjectTasks);
  // const [box, setBox] = useState(['doing', 'finished', 'paused', 'not doing']);

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  // return (
  //   <div className='border '>
  //     <DndContext
  //       sensors={sensors}
  //       collisionDetection={closestCenter}
  //       onDragEnd={handleDragEnd}
  //     >
  //       {
  //         box.map(b => {
  //           return (
  //             <>
  //               <BoxTasks horizontalListSortingStrategy={horizontalListSortingStrategy} name={b}>
  //                 {
  //                   items.filter(item => item.estado === b).items.map(item => {
  //                     <ShowTasksProject key={item.id} id={item.id} />
  //                   })
  //                 }
  //               </BoxTasks>
  //             </>
  //           )
  //         })
  //       }
  //       {/* <SortableContext
  //         items={items}
  //         strategy={verticalListSortingStrategy}
  //       >
  //         {items.map(item => <ShowTasksProject key={item.id} id={item.id} />)}
  //       </SortableContext> */}
  //     </DndContext>
  //   </div>

  // );

  // function handleDragEnd(event) {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // }
}

export default DragDrop