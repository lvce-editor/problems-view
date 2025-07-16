import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ViewletAction } from '../src/parts/ViewletAction/ViewletAction.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getProblemsFilterVirtualDom } from '../src/parts/GetProblemsFilterVirtualDom/GetProblemsFilterVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getProblemsFilterVirtualDom returns correct dom structure without badge', () => {
  const action: ViewletAction = {
    type: 1,
    id: 'Filter',
    command: 'handleFilterInput',
    placeholder: 'Filter problems',
    value: '',
  }
  const dom = getProblemsFilterVirtualDom(action)
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Filter,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      spellcheck: false,
      autocapitalize: 'off',
      autocorrect: 'off',
      placeholder: 'Filter problems',
      onInput: 'handleFilterInput',
      name: InputName.Filter,
    },
    {
      type: VirtualDomElements.Button,
      className: ClassNames.IconButton,
      title: 'more filters',
      'data-command': 'more filters',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'MaskIcon MaskIconFilter',
      role: 'none',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
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
  const expectedArray = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Filter,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Input,
      className: ClassNames.InputBox,
      spellcheck: false,
      autocapitalize: 'off',
      autocorrect: 'off',
      placeholder: 'Filter problems',
      onInput: 'handleFilterInput',
      name: InputName.Filter,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FilterBadge,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Text,
      text: 'Showing 5 of 10',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Button,
      className: ClassNames.IconButton,
      title: 'more filters',
      'data-command': 'more filters',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'MaskIcon MaskIconFilter',
      role: 'none',
      childCount: 0,
    },
  ]
  expect(dom).toEqual(expectedArray)
})
