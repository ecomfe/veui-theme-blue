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
    component: Carousel
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
    component: CheckButtonGroup,
    isComplete: true
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
    component: DatePicker,
    isComplete: true
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: Dialog
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
    isComplete: true
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
    component: Overlay
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
    component: Progress,
    isComplete: true
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
    component: RadioButtonGroup,
    isComplete: true
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
    component: RegionPicker
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/slider',
    name: 'Slider',
    component: Slider
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
    component: Select,
    isComplete: true
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
    component: Switch,
    isComplete: true
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
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
    ]
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
    component: Toast,
    isComplete: true
  },
  {
    path: '/tooltip',
    name: 'Tooltip',
    component: Tooltip,
    isComplete: true
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/uploader',
    name: 'Uploader',
    component: Uploader,
    isComplete: true
  }
]
