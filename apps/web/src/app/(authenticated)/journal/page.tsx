'use client'

import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  Card,
  Button,
  Modal,
  Input,
  Form,
  Space,
  DatePicker,
  Tag,
  Layout,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Content } = Layout
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'

export default function JournalPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [journals, setJournals] = useState<Model.Journal[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentJournal, setCurrentJournal] = useState<Model.Journal | null>(null)
  const [form] = Form.useForm()
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')
  const [filterDate, setFilterDate] = useState<string>('')

  useEffect(() => {
    if (userId) {
      fetchJournals()
    }
  }, [userId, sortOrder, filterDate])

  const fetchJournals = async () => {
    try {
      const queryOptions: {
        includes: string[]
        orders: { dateCreated: 'ASC' | 'DESC' }
        filters?: { dateCreated?: { eq: string } }
      } = {
        includes: ['todos', 'airesponses'],
        orders: { dateCreated: sortOrder },
        filters: filterDate ? { dateCreated: { eq: filterDate } } : undefined,
      }
      const journalsData = await Api.Journal.findManyByUserId(userId, queryOptions)
      setJournals(journalsData)
    } catch (error) {
      enqueueSnackbar('Failed to fetch journals', { variant: 'error' })
    }
  }

  const handleAddJournal = async (values: any) => {
    try {
      await Api.Journal.createOneByUserId(userId, values)
      fetchJournals()
      enqueueSnackbar('Journal added successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to add journal', { variant: 'error' })
    }
  }

  const handleUpdateJournal = async (id: string, values: any) => {
    try {
      await Api.Journal.updateOne(id, values)
      fetchJournals()
      enqueueSnackbar('Journal updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update journal', { variant: 'error' })
    }
  }

  const handleDeleteJournal = async (id: string) => {
    try {
      await Api.Journal.deleteOne(id)
      fetchJournals()
      enqueueSnackbar('Journal deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete journal', { variant: 'error' })
    }
  }

  const showModal = (journal: Model.Journal | null) => {
    setCurrentJournal(journal)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDateChange = (date: dayjs.Dayjs | null, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      setFilterDate(dateString[0] || '')
    } else {
      setFilterDate(dateString)
    }
  }

  return (
    <Layout>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Title level={2}>Journal Entries</Title>
        <Text>Manage your tasks, goals, and daily reflections.</Text>
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal(null)}
          >
            Add Journal
          </Button>
          <Button
            icon={sortOrder === 'ASC' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
            onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
          >
            Sort by Date
          </Button>
          <DatePicker
            onChange={handleDateChange}
            placeholder="Filter by Date"
          />
        </Space>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={journals}
          renderItem={journal => (
            <List.Item>
              <Card
                title={journal.title}
                actions={[
                  <EditOutlined key="edit" onClick={() => showModal(journal)} />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeleteJournal(journal.id)}
                  />,
                ]}
              >
                <Paragraph>{journal.content}</Paragraph>
                <Text type="secondary">
                  {dayjs(journal.dateCreated).format('YYYY-MM-DD')}
                </Text>
                {journal.todos?.map(todo => (
                  <Tag key={todo.id} color={todo.status === 'completed' ? 'green' : 'red'}>
                    {todo.description}
                  </Tag>
                ))}
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title={currentJournal ? 'Edit Journal' : 'Add Journal'}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            initialValues={currentJournal}
            onFinish={currentJournal ? (values) => handleUpdateJournal(currentJournal.id, values) : handleAddJournal}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: 'Please input the content!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="dateCreated"
              label="Date"
              rules={[{ required: true, message: 'Please select the date!' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  {currentJournal ? 'Update' : 'Add'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}
