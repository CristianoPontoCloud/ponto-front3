import type { StatusDefaultEnum } from "../usecases/status-default"

export interface DevicePermission {
  hasAccess: boolean
  facialRecognition: boolean
  biometricRecognition: boolean
  barCode: boolean
  qrCode: boolean
  badge: boolean
  pin: boolean
  pointMark: boolean
  photo: boolean
  throwJustify: boolean
}
export interface DevicePermissionsForm {
  web: DevicePermission
  mobile: DevicePermission
  status: StatusDefaultEnum
}
export interface AccessProfile extends DevicePermissionsForm {
  id: string
  name: string
  web: DevicePermission
  mobile: DevicePermission
  collaborators: string[]
}

export interface AccessProfileFormProps extends Omit<AccessProfile, 'id' | 'collaborators'> {
  id?: string
}
