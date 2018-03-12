import Button from './Button'
import Table from './Table'
import Pagination from './Pagination'
import Uploader from './Uploader'
import Dialog from './Dialog'
import Overlay from './Overlay'
import Breadcrumb from './Breadcrumb'
import Input from './Input'
import Form from './Form'
import Font from './Font'
import Calendar from './Calendar'
import DatePicker from './DatePicker'
import Select from './Select'
import Dropdown from './Dropdown'
import Radio from './Radio'
import Checkbox from './Checkbox'
import RadioGroup from './RadioGroup'
import RadioButtonGroup from './RadioButtonGroup'
import CheckboxGroup from './CheckboxGroup'
import CheckButtonGroup from './CheckButtonGroup'
import Tooltip from './Tooltip'
import Toast from './Toast'
import Alert from './Alert'
import Tabs from './Tabs'
import Switch from './Switch'
import Searchbox from './Searchbox'
import Steps from './Steps'
import RegionPicker from './RegionPicker'
import ButtonGroup from './ButtonGroup'
import Progress from './Progress'
import Carousel from './Carousel'
import Transfer from './Transfer'
import Schedule from './Schedule'
import Slider from './Slider'
import Textarea from './Textarea'
import Icon from './Icon'

export default [
  {
    path: '/alert',
    name: 'Alert',
    component: Alert,
    isComplete: true
  },
  {
    path: '/breadcrumb',
    name: 'Breadcrumb',
    component: Breadcrumb,
    isComplete: true
  },
  {
    path: '/button',
    name: 'Button',
    component: Button,
    isComplete: true
  },
  {
    path: '/button-group',
    name: 'ButtonGroup',
    component: ButtonGroup,
    isComplete: true
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    isComplete: true
  },
  {
    path: '/carousel',
    name: 'Carousel',
    component: Carousel,
    isComplete: 'noDev'
  },
  {
    path: '/checkbox',
    name: 'Checkbox',
    component: Checkbox,
    isComplete: true
  },
  {
    path: '/check-button-group',
    name: 'CheckButtonGroup',
    component: CheckButtonGroup
  },
  {
    path: '/checkbox-group',
    name: 'CheckboxGroup',
    component: CheckboxGroup,
    isComplete: true
  },
  {
    path: '/date-picker',
    name: 'DatePicker',
    component: DatePicker
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: Dialog,
    isComplete: 'noUi'
  },
  {
    path: '/dropdown',
    name: 'Dropdown',
    component: Dropdown,
    isComplete: true
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
    isComplete: 'noUi'
  },
  {
    path: '/font',
    name: 'Font',
    component: Font,
    isComplete: true
  },
  {
    path: '/icon',
    name: 'Icon',
    component: Icon,
    isComplete: true
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
    isComplete: true
  },
  {
    path: '/overlay',
    name: 'Overlay',
    component: Overlay,
    isComplete: 'noDev'
  },
  {
    path: '/pagination/:page?',
    name: 'Pagination',
    component: Pagination,
    isComplete: true
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress
  },
  {
    path: '/radio',
    name: 'Radio',
    component: Radio,
    isComplete: true
  },
  {
    path: '/radio-button-group',
    name: 'RadioButtonGroup',
    component: RadioButtonGroup
  },
  {
    path: '/radio-group',
    name: 'RadioGroup',
    component: RadioGroup,
    isComplete: true
  },
  {
    path: '/region-picker',
    name: 'RegionPicker',
    component: RegionPicker,
    isComplete: 'noDev'
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    isComplete: 'noDev'
  },
  {
    path: '/slider',
    name: 'Slider',
    component: Slider,
    isComplete: 'noDev'
  },
  {
    path: '/searchbox',
    name: 'Searchbox',
    component: Searchbox,
    isComplete: true
  },
  {
    path: '/select',
    name: 'Select',
    component: Select
  },
  {
    path: '/steps',
    name: 'Steps',
    component: Steps,
    isComplete: true
  },
  {
    path: '/switch',
    name: 'Switch',
    component: Switch
  },
  {
    path: '/table',
    name: 'Table',
    component: Table,
    isComplete: 'noUi'
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: Tabs,
    redirect: '/tabs/button',
    children: [
      {
        path: 'button',
        component: Button
      },
      {
        path: 'input',
        component: Input
      },
      {
        path: 'progress',
        component: Progress
      }
    ],
    isComplete: 'noUi'
  },
  {
    path: '/textarea',
    name: 'Textarea',
    component: Textarea,
    isComplete: true
  },
  {
    path: '/toast',
    name: 'Toast',
    component: Toast
  },
  {
    path: '/tooltip',
    name: 'Tooltip',
    component: Tooltip
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer,
    isComplete: 'noDev'
  },
  {
    path: '/uploader',
    name: 'Uploader',
    component: Uploader,
    isComplete: true
  }
]
