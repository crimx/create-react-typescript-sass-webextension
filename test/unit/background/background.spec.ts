import '../../../src/background'

describe('background page', () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  it('should set up a listener', () => {
    expect(browser.runtime.onMessage.addListener.calledOnce).toBeTruthy()
  })

  it('should resopnse "GREETING" request', () => {
    browser.runtime.onMessage.dispatch({ type: 'GREETING' })
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
