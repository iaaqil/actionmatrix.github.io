export namespace HostviewApplicationEvent {
  export namespace HostviewCreated {
    export const key = 'hostview.application.hostview.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
