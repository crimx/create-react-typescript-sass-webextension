import '../index'

it('should have called a webextension API', () => {
  expect(browser.runtime.onMessage.addListener).toHaveBeenCalled()
})
