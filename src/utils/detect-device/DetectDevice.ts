export class DetectDevice {
  constructor() {}

  public isIos() {
    return (
      navigator.maxTouchPoints > 0 &&
      /(iPod|iPhone|iPad|Mac)/i.test(navigator.userAgent)
    );
  }
}
