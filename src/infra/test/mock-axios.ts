import axios from 'axios'
import faker from 'faker'

type Props = {
  data: {}
  status: number
}

export const mockHttpResponse = (): Props => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
