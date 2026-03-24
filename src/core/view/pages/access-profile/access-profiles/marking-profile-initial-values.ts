import type { AccessProfileFormProps } from "@/domain/entities/access-profile";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";

export const accessProfileInitialValues: AccessProfileFormProps = {
  id: "",
  name: "",
  mobile: {
    badge: false,
    barCode: false,
    biometricRecognition: false,
    facialRecognition: false,
    hasAccess: false,
    photo: false,
    pin: false,
    pointMark: false,
    qrCode: false,
    throwJustify: false,
  },
  web: {
    badge: false,
    barCode: false,
    biometricRecognition: false,
    facialRecognition: false,
    hasAccess: false,
    photo: false,
    pin: false,
    pointMark: false,
    qrCode: false,
    throwJustify: false,
  },
  status: StatusDefaultEnum.active
}
