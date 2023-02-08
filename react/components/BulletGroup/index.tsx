import React, { PropsWithChildren } from 'react';
import { BulletsSchema } from './BulletTypes';
import { useDevice } from 'vtex.device-detector'; 
import { useListContext, ListContextProvider } from 'vtex.list-context';
import { getBulletsAsTSXList } from './modulos/bulletsAsList'; 
import { useCssHandles } from 'vtex.css-handles';

export interface BulletGroupProps {
    bullets: BulletsSchema
}

const BulletGroup = ({  bullets, children} : PropsWithChildren<BulletGroupProps>) => {
  const { isMobile } = useDevice();
  const { list } = useListContext() || [];

  const bulletsContent =  getBulletsAsTSXList(bullets);

  const newListContextValue = list.concat(bulletsContent)

  const CSS_HANDLES = [
    "bullet__container"
  ]

  const handles = useCssHandles(CSS_HANDLES)

    return <ListContextProvider
                list={newListContextValue}
             >
        {isMobile 
        ? 
            <div className={handles["bullet__container"]}>
                {bulletsContent}
            </div> 
        :
            <div>{children}</div>}
    </ListContextProvider>
} 

export default BulletGroup;