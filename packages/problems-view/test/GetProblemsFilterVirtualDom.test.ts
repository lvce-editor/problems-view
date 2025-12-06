import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../src/parts/ViewletAction/ViewletAction.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsFilterVirtualDom } from '../src/parts/GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getProblemsFilterVirtualDom returns correct dom structure without badge', () => {
  const action: ViewletAction = {
    command: 'handleFilterInput',
    id: 'Filter',
    placeholder: 'Filter problems',
    type: 1,
    value: '',
  }
  const dom = getProblemsFilterVirtualDom(action)
  const expectedArray = [
    {
      childCount: 2,
      className: ClassNames.Filter,
      type: VirtualDomElements.Div,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      className: ClassNames.InputBox,
      name: InputName.Filter,
      onInput: 'handleFilterInput',
      placeholder: 'Filter problems',
      spellcheck: false,
      type: VirtualDomElements.Input,
    },
    {
      childCount: 1,
      className: ClassNames.IconButton,
      'data-command': 'more filters',
      title: 'more filters',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconFilter',
      role: 'none',
      type: VirtualDomElements.Div,
    },
  ]
  expect(dom).toEqual(expectedArray)
})

test('getProblemsFilterVirtualDom returns correct dom structure with badge', () => {
  const action: ViewletAction = {
    badgeText: 'Showing 5 of 10',
    command: 'handleFilterInput',
    id: 'Filter',
    placeholder: 'Filter problems',
    type: 1,
    value: 'test',
  }
  const dom = getProblemsFilterVirtualDom(action)
  const expectedArray = [
    {
      childCount: 3,
      className: ClassNames.Filter,
      type: VirtualDomElements.Div,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      className: ClassNames.InputBox,
      name: InputName.Filter,
      onInput: 'handleFilterInput',
      placeholder: 'Filter problems',
      spellcheck: false,
      type: VirtualDomElements.Input,
    },
    {
      childCount: 1,
      className: ClassNames.FilterBadge,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Showing 5 of 10',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: ClassNames.IconButton,
      'data-command': 'more filters',
      title: 'more filters',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconFilter',
      role: 'none',
      type: VirtualDomElements.Div,
    },
  ]
  expect(dom).toEqual(expectedArray)
})
