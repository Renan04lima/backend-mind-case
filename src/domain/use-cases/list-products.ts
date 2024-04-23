
type Input = {

}

type Output = {
  id: number
  name: string
  description: string
  image?: {
    buffer: Buffer
    mimetype: string
  }
  price: number
  quantityStock: number
}[]

export type ListProducts = (input: Input) => Promise<Output>


