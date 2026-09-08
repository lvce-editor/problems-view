import type { DomEventListener } from '@lvce-editor/virtual-dom-worker'
import { EventExpression } from '@lvce-editor/virtual-dom-worker'
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
      params: ['handleContextMenu', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleFilterInput,
      // @ts-ignore
      params: ['handleFilterInput', EventExpression.TargetValue, InputSource.User],
    },
    {
      name: DomEventListenerFunctions.HandleClearFilterClick,
      params: ['clearFilter'],
    },
    {
      name: DomEventListenerFunctions.HandleClick,
      params: ['handleClickAt', EventExpression.ClientX, EventExpression.ClientY],
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
      stopPropagation: true,
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
