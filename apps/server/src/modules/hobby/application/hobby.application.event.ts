export namespace HobbyApplicationEvent {
  export namespace HobbyCreated {
    export const key = 'hobby.application.hobby.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
