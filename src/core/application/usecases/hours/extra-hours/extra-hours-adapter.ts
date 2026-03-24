import type { ExtraHourDetails, ExtraHourDetailsNumberMultiplier, ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import type { CreateDto, EditDto } from "@/domain/http/http-client";
import { ExtraHourAdapterBands } from "../extra-hours-rules/extra-hour-rules-adapter-bands";

export class ExtraHourAdapter {
  private adapterBands = new ExtraHourAdapterBands()
  onCreate(data: CreateDto<ExtraHourFormProps>): CreateDto<ExtraHourDetailsNumberMultiplier> {
    const { rules } = data
    return {
      ...data,
      rules: (rules ?? []).map((rule) => ({
        ...rule,
        bands: this.adapterBands.adaptPercentageToNumber(rule.bands),
      }))
    }
  }

  onUpdate(data: EditDto<ExtraHourFormProps>): EditDto<ExtraHourDetailsNumberMultiplier> {
    const { rules } = data
    return {
      ...data,
      rules: (rules ?? []).map((rule) => ({
        ...rule,
        bands: this.adapterBands.adaptPercentageToNumber(rule.bands),
      }))
    }
  }

  onGet(data: ExtraHourDetailsNumberMultiplier): ExtraHourDetails {
    const { rules } = data
    return {
      ...data,
      rules: (rules ?? []).map((rule) => ({
        ...rule,
        bands: this.adapterBands.adaptPercentageToString(rule.bands),
        specificDays: rule.specificDays.map(String),
      }))
    }
  }
}
