export namespace HabitApplicationEvent {
  export namespace HabitCreated {
    export const key = 'habit.application.habit.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
