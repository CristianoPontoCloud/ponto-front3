import { tv } from "tailwind-variants"

export function CredDebtTimeCell({ value }: { value: string }) {
  const hasPlusCaracter = value.split('')[0] === '+'
  const hasMinusCaracter = value.split('')[0] === '-'
  const divVariants = tv({
    base: 'w-full h-full flex items-center justify-center',
    variants: {
      hasPlusCaracter: {
        true: 'text-lime-500',
        false: ''
      },
      hasMinusCaracter: {
        true: 'text-red-600',
        false: ''
      }
    }
  })
  return <div className={divVariants({ hasPlusCaracter, hasMinusCaracter })} >
    {value}
  </div>
}
