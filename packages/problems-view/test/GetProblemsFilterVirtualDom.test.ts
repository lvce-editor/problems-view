import { test, expect } from '@jest/globals'
import { getProblemsFilterVirtualDom } from '../src/parts/GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

import type { ViewletAction } from '../src/parts/ViewletAction/ViewletAction.ts'

test('getProblemsFilterVirtualDom returns correct dom structure without badge', () => {
  const action: ViewletAction = {
    type: 1,
    id: 'Filter',
    command: 'handleFilterInput',
    placeholder: 'Filter problems',
    value: '',
  }
  const dom = getProblemsFilterVirtualDom(action)
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Filter,
    childCount: 2,
  })
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Input,
    className: ClassNames.InputBox,
    spellcheck: false,
    autocapitalize: 'off',
    autocorrect: 'off',
    placeholder: 'Filter problems',
    onInput: 'handleFilterInput',
    name: InputName.Filter,
    value: '',
  })
  expect(dom[2]).toMatchObject({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'more filters',
    'data-command': 'more filters',
  })
})

test('getProblemsFilterVirtualDom returns correct dom structure with badge', () => {
  const action: ViewletAction = {
    type: 1,
    id: 'Filter',
    command: 'handleFilterInput',
    placeholder: 'Filter problems',
    value: 'test',
    badgeText: 'Showing 5 of 10',
  }
  const dom = getProblemsFilterVirtualDom(action)
  expect(dom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Filter,
    childCount: 3,
  })
  expect(dom[1]).toEqual({
    type: VirtualDomElements.Input,
    className: ClassNames.InputBox,
    spellcheck: false,
    autocapitalize: 'off',
    autocorrect: 'off',
    placeholder: 'Filter problems',
    onInput: 'handleFilterInput',
    name: InputName.Filter,
    value: 'test',
  })
  expect(dom[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.FilterBadge,
    childCount: 1,
  })
  expect(dom[3]).toMatchObject({ text: 'Showing 5 of 10' })
  expect(dom[4]).toMatchObject({
    type: VirtualDomElements.Button,
    className: ClassNames.IconButton,
    title: 'more filters',
    'data-command': 'more filters',
  })
})