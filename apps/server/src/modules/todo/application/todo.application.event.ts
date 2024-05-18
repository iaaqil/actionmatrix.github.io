export namespace TodoApplicationEvent {
  export namespace TodoCreated {
    export const key = 'todo.application.todo.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
