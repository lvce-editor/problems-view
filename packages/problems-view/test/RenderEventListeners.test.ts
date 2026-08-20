import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners should return an array of event listeners', () => {
  const result = renderEventListeners()
  expect(result).toBeDefined()
})

test('renderEventListeners registers the problems toolbar actions', () => {
  const result = renderEventListeners()

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: DomEventListenerFunctions.HandleClickMoreFilters,
        params: ['handleClickMoreFilters', EventExpression.ClientX, EventExpression.ClientY],
      },
      {
        name: DomEventListenerFunctions.HandleFileNameClick,
        params: ['toggleFileGroup', 'event.target.dataset.uri'],
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
    ]),
  )
})

test('renderEventListeners keeps scrollbar pointerdown from selecting a problem', () => {
  const result = renderEventListeners()

  expect(result).toEqual(
    expect.arrayContaining([
      {
        name: DomEventListenerFunctions.HandleScrollBarPointerDown,
        params: ['handleScrollBarClick', EventExpression.ClientY],
        preventDefault: true,
        stopPropagation: true,
        trackPointerEvents: [DomEventListenerFunctions.HandleScrollBarMove, DomEventListenerFunctions.HandleScrollBarPointerCaptureLost],
      },
    ]),
  )
})
