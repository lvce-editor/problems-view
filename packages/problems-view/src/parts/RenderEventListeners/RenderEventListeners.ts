import type { DomEventListener } from '@lvce-editor/virtual-dom-worker'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleBlur,
      params: ['handleBlur'],
    },
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: ['handleContextMenu', 'event.clientX', 'event.clientY'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleFilterInput,
      // @ts-ignore
      params: ['handleFilterInput', 'event.target.value', InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleClearFilterClick,
      params: ['clearFilter'],
    },
    {
      name: DomEventListenerFunctions.HandlePointerDown,
      params: ['handleClickAt', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandleFileNameClick,
      params: ['toggleFileGroup', 'event.target.dataset.uri'],
    },
    {
      name: DomEventListenerFunctions.HandleClickMoreFilters,
      params: ['handleClickMoreFilters', EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleClickButton,
      params: ['handleClickButton', EventExpression.TargetName, EventExpression.ClientX, EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleCollapseAll,
      params: ['collapseAll'],
    },
    {
      name: DomEventListenerFunctions.HandleViewAsList,
      params: ['viewAsList'],
    },
    {
      name: DomEventListenerFunctions.HandleViewAsTable,
      params: ['viewAsTable'],
    },
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['handleWheel', EventExpression.DeltaMode, EventExpression.DeltaY],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandleScrollBarPointerDown,
      params: ['handleScrollBarClick', EventExpression.ClientY],
      preventDefault: true,
      trackPointerEvents: [DomEventListenerFunctions.HandleScrollBarMove, DomEventListenerFunctions.HandleScrollBarPointerCaptureLost],
    } as DomEventListener,
    {
      name: DomEventListenerFunctions.HandleScrollBarMove,
      params: ['handleScrollBarMove', EventExpression.ClientY],
    },
    {
      name: DomEventListenerFunctions.HandleScrollBarPointerCaptureLost,
      params: ['handleScrollBarCaptureLost'],
    },
  ]
}
