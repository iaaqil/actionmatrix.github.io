export namespace AiresponseApplicationEvent {
  export namespace AiresponseCreated {
    export const key = 'airesponse.application.airesponse.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
