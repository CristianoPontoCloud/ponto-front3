import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";
describe("cellBorderRemover", () => {

  it("Should return all values void string", () => {
    const result = cellBorderRemover({})
    expect(result).to.deep.equal({
      border: {
        bottom: { width: '' },
        right: { width: '' },
        left: { width: '' },
        top: { width: '' },
      },
    })
  });
  it("Should return bottom with value 0px", () => {
    const result = cellBorderRemover({ bottom: true })
    expect(result).to.deep.equal({
      border: {
        bottom: { width: '0px' },
        right: { width: '' },
        left: { width: '' },
        top: { width: '' },
      },
    })
  });
  it("Should return right with value 0px", () => {
    const result = cellBorderRemover({ right: true })
    expect(result).to.deep.equal({
      border: {
        bottom: { width: '' },
        right: { width: '0px' },
        left: { width: '' },
        top: { width: '' },
      },
    })
  });
  it("Should return left with value 0px", () => {
    const result = cellBorderRemover({ left: true })
    expect(result).to.deep.equal({
      border: {
        bottom: { width: '' },
        right: { width: '' },
        left: { width: '0px' },
        top: { width: '' },
      },
    })
  });
  it("Should return top with value 0px", () => {
    const result = cellBorderRemover({ top: true })
    expect(result).to.deep.equal({
      border: {
        bottom: { width: '' },
        right: { width: '' },
        left: { width: '' },
        top: { width: '0px' },
      },
    })
  });
});
