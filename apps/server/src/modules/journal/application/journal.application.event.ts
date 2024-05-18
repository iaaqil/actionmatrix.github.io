export namespace JournalApplicationEvent {
  export namespace JournalCreated {
    export const key = 'journal.application.journal.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
