export function fullSpanGenerate(gridCol: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" = "2") {
  return `col-span-${gridCol} sm:col-span-${gridCol} md:col-span-${gridCol} lg:col-span-${gridCol} xl:col-span-${gridCol} 2xl:col-span-${gridCol}`
}
