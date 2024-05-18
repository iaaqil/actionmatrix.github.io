'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  List,
  Typography,
  Modal,
} from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SchedulePage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [schedules, setSchedules] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentSchedule, setCurrentSchedule] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchSchedules()
    }
  }, [userId])

  const fetchSchedules = async () => {
    try {
      const schedulesFound = await Api.Schedule.findManyByUserId(userId, {
        includes: ['user'],
      })
      setSchedules(schedulesFound)
    } catch (error) {
      enqueueSnackbar('Failed to fetch schedules', { variant: 'error' })
    }
  }

  const handleCreateOrUpdateSchedule = async values => {
    try {
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm:ss'),
        userId,
      }

      let schedule
      if (currentSchedule) {
        schedule = await Api.Schedule.updateOne(
          currentSchedule.id,
          formattedValues,
        )
      } else {
        schedule = await Api.Schedule.createOneByUserId(userId, formattedValues)
      }

      enqueueSnackbar(
        `Schedule ${currentSchedule ? 'updated' : 'created'} successfully`,
        { variant: 'success' },
      )
      form.resetFields()
      setIsModalVisible(false)
      setCurrentSchedule(null)
      fetchSchedules()
    } catch (error) {
      enqueueSnackbar(
        `Failed to ${currentSchedule ? 'update' : 'create'} schedule`,
        { variant: 'error' },
      )
    }
  }

  const showEditModal = schedule => {
    setCurrentSchedule(schedule)
    form.setFieldsValue({
      date: dayjs(schedule.date),
      time: dayjs(schedule.time, 'HH:mm:ss'),
      activity: schedule.activity,
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
    setCurrentSchedule(null)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Your Schedules</Title>
      <Text>Manage your daily and weekly schedules here.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add Schedule
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={schedules}
        renderItem={item => (
          <List.Item
            actions={[
              <EditOutlined key="edit" onClick={() => showEditModal(item)} />,
            ]}
          >
            <List.Item.Meta
              title={dayjs(item.date).format('YYYY-MM-DD')}
              description={`${item.time} - ${item.activity}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={`${currentSchedule ? 'Edit' : 'Create'} Schedule`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateOrUpdateSchedule}
          layout="vertical"
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="activity"
            label="Activity"
            rules={[{ required: true, message: 'Please input an activity' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {currentSchedule ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal>
    </PageLayout>
  )
}
