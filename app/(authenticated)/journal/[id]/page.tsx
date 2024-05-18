'use client'

import { useEffect, useState } from 'react'
import { Button, Input, Typography, List, Card, Modal, Form } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function JournalEntryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [journal, setJournal] = useState<Model.Journal | null>(null)
  const [todos, setTodos] = useState<Model.Todo[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [todoDescription, setTodoDescription] = useState('')

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const journalData = await Api.Journal.findOne(params.id, {
          includes: ['todos'],
        })
        setJournal(journalData)
        setTodos(journalData.todos || [])
      } catch (error) {
        enqueueSnackbar('Failed to fetch journal data', { variant: 'error' })
      }
    }

    fetchJournal()
  }, [params.id])

  const handleUpdateJournal = async (values: Partial<Model.Journal>) => {
    try {
      const updatedJournal = await Api.Journal.updateOne(journal!.id, values)
      setJournal(updatedJournal)
      enqueueSnackbar('Journal updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update journal', { variant: 'error' })
    }
  }

  const handleAddTodo = async () => {
    try {
      const newTodo = await Api.Todo.createOneByJournalId(journal!.id, {
        description: todoDescription,
        status: 'pending',
      })
      setTodos([...todos, newTodo])
      setTodoDescription('')
      setIsModalVisible(false)
      enqueueSnackbar('Todo added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add todo', { variant: 'error' })
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await Api.Todo.deleteOne(todoId)
      setTodos(todos.filter(todo => todo.id !== todoId))
      enqueueSnackbar('Todo deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete todo', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Journal Entry</Title>
      {journal ? (
        <>
          <Paragraph>
            <Text strong>Title:</Text> {journal.title}
          </Paragraph>
          <Paragraph>
            <Text strong>Content:</Text> {journal.content}
          </Paragraph>
          <Paragraph>
            <Text strong>Created:</Text>{' '}
            {dayjs(journal.dateCreated).format('YYYY-MM-DD')}
          </Paragraph>
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              handleUpdateJournal({
                title: 'Updated Title',
                content: 'Updated Content',
              })
            }
          >
            Edit Journal
          </Button>
          <Title level={4}>Todos</Title>
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Todo
          </Button>
          <List
            dataSource={todos}
            renderItem={item => (
              <List.Item
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeleteTodo(item.id)}
                  />,
                ]}
              >
                <Card title={item.description}>
                  <Text>{item.status}</Text>
                </Card>
              </List.Item>
            )}
          />
          <Modal
            title="Add Todo"
            visible={isModalVisible}
            onOk={handleAddTodo}
            onCancel={() => setIsModalVisible(false)}
          >
            <Form layout="vertical">
              <Form.Item label="Description">
                <Input
                  value={todoDescription}
                  onChange={e => setTodoDescription(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </PageLayout>
  )
}
