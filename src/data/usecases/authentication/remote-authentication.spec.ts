import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpPostClientSpy()
  // sut system under test
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any'
    const { sut, httpClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpClientSpy.url).toBe(url)
  })
})
