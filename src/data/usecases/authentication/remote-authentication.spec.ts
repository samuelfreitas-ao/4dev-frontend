import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any'
    const httpClientSpy = new HttpPostClientSpy()
    // sut system under test
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()
    expect(httpClientSpy.url).toBe(url)
  })
})
