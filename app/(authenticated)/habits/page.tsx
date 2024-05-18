'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, List, Modal, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HabitsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [habits, setHabits] = useState<Model.Habit[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentHabit, setCurrentHabit] = useState<Model.Habit | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      loadHabits()
    }
  }, [userId])

  const loadHabits = async () => {
    try {
      const habitsFound = await Api.Habit.findManyByUserId(userId)
      setHabits(habitsFound)
    } catch (error) {
      enqueueSnackbar('Failed to load habits', { variant: 'error' })
    }
  }

  const handleAddHabit = () => {
    setCurrentHabit(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditHabit = (habit: Model.Habit) => {
    setCurrentHabit(habit)
    form.setFieldsValue(habit)
    setIsModalVisible(true)
  }

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await Api.Habit.deleteOne(habitId)
      enqueueSnackbar('Habit deleted successfully', { variant: 'success' })
      loadHabits()
    } catch (error) {
      enqueueSnackbar('Failed to delete habit', { variant: 'error' })
    }
  }

  const handleFormSubmit = async (values: Partial<Model.Habit>) => {
    try {
      if (currentHabit) {
        await Api.Habit.updateOne(currentHabit.id, { ...values, userId })
      } else {
        await Api.Habit.createOneByUserId(userId, values)
      }
      enqueueSnackbar('Habit saved successfully', { variant: 'success' })
      setIsModalVisible(false)
      loadHabits()
    } catch (error) {
      enqueueSnackbar('Failed to save habit', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Your Habits</Title>
      <Text>
        Track and manage your daily habits to improve productivity and personal
        growth.
      </Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddHabit}
        style={{ marginBottom: 16 }}
      >
        Add Habit
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={habits}
        renderItem={habit => (
          <List.Item
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => handleEditHabit(habit)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => handleDeleteHabit(habit.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={habit.description}
              description={`Frequency: ${habit.frequency}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentHabit ? 'Edit Habit' : 'Add Habit'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            rules={[{ required: true, message: 'Please input the frequency!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}
