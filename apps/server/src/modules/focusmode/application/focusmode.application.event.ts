export namespace FocusmodeApplicationEvent {
  export namespace FocusmodeCreated {
    export const key = 'focusmode.application.focusmode.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
