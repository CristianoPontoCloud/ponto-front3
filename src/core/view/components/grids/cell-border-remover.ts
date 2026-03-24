interface CellBorderRemoverParams {
  right?: boolean
  left?: boolean
  top?: boolean
  bottom?: boolean
}
export function cellBorderRemover({ bottom, left, right, top }: CellBorderRemoverParams) {
  return {
    border: {
      right: {
        width: right ? "0px" : "",
      },
      bottom: {
        width: bottom ? "0px" : "",
      },
      left: {
        width: left ? "0px" : "",
      },
      top: {
        width: top ? "0px" : "",
      },
    },
  };
}
