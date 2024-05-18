'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, List, Modal, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function GoalsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [goals, setGoals] = useState<Model.Goal[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchGoals = async () => {
      if (userId) {
        try {
          const fetchedGoals = await Api.Goal.findManyByUserId(userId, {
            includes: ['user'],
          })
          setGoals(fetchedGoals)
        } catch (error) {
          enqueueSnackbar('Failed to fetch goals', { variant: 'error' })
        }
      }
    }

    fetchGoals()
  }, [userId])

  const handleCreateGoal = async (values: { description: string }) => {
    if (userId) {
      try {
        const newGoal = await Api.Goal.createOneByUserId(userId, {
          ...values,
          status: 'Active',
        })
        setGoals([...goals, newGoal])
        enqueueSnackbar('Goal created successfully', { variant: 'success' })
        setIsModalVisible(false)
        form.resetFields()
      } catch (error) {
        enqueueSnackbar('Failed to create goal', { variant: 'error' })
      }
    }
  }

  const handleUpdateGoal = async (
    goalId: string,
    values: { description: string },
  ) => {
    try {
      const updatedGoal = await Api.Goal.updateOne(goalId, values)
      const updatedGoals = goals.map(goal =>
        goal.id === goalId ? updatedGoal : goal,
      )
      setGoals(updatedGoals)
      enqueueSnackbar('Goal updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update goal', { variant: 'error' })
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await Api.Goal.deleteOne(goalId)
      const filteredGoals = goals.filter(goal => goal.id !== goalId)
      setGoals(filteredGoals)
      enqueueSnackbar('Goal deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete goal', { variant: 'error' })
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Your Goals</Title>
      <Text>Here you can add, update, and review your personal goals.</Text>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Goal
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={goals}
        renderItem={goal => (
          <List.Item
            actions={[
              <Button
                key="edit"
                onClick={() =>
                  handleUpdateGoal(goal.id, {
                    description: 'Updated Description',
                  })
                }
              >
                Edit
              </Button>,
              <Button key="delete" onClick={() => handleDeleteGoal(goal.id)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={goal.description}
              description={`Created on ${dayjs(goal.dateCreated).format('YYYY-MM-DD')}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Add New Goal"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateGoal}>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: 'Please input the goal description!' },
            ]}
          >
            <Input placeholder="Goal Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
