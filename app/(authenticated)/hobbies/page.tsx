'use client'

import { useEffect, useState } from 'react'
import { Button, Input, List, Modal, Typography } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HobbyPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [hobbies, setHobbies] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentHobby, setCurrentHobby] = useState(null)
  const [hobbyDescription, setHobbyDescription] = useState('')

  useEffect(() => {
    if (userId) {
      fetchHobbies()
    }
  }, [userId])

  const fetchHobbies = async () => {
    try {
      const fetchedHobbies = await Api.Hobby.findManyByUserId(userId)
      setHobbies(fetchedHobbies)
    } catch (error) {
      enqueueSnackbar('Failed to fetch hobbies', { variant: 'error' })
    }
  }

  const handleAddHobby = async () => {
    try {
      const newHobby = await Api.Hobby.createOneByUserId(userId, {
        description: hobbyDescription,
      })
      setHobbies([...hobbies, newHobby])
      setIsModalVisible(false)
      enqueueSnackbar('Hobby added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add hobby', { variant: 'error' })
    }
  }

  const handleUpdateHobby = async () => {
    try {
      const updatedHobby = await Api.Hobby.updateOne(currentHobby.id, {
        description: hobbyDescription,
      })
      const updatedHobbies = hobbies.map(hobby =>
        hobby.id === updatedHobby.id ? updatedHobby : hobby,
      )
      setHobbies(updatedHobbies)
      setIsModalVisible(false)
      enqueueSnackbar('Hobby updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update hobby', { variant: 'error' })
    }
  }

  const handleDeleteHobby = async hobbyId => {
    try {
      await Api.Hobby.deleteOne(hobbyId)
      const filteredHobbies = hobbies.filter(hobby => hobby.id !== hobbyId)
      setHobbies(filteredHobbies)
      enqueueSnackbar('Hobby deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete hobby', { variant: 'error' })
    }
  }

  const showModal = (hobby = null) => {
    setCurrentHobby(hobby)
    setHobbyDescription(hobby ? hobby.description : '')
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Manage Hobbies</Title>
      <Text>Track and manage your hobbies here.</Text>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
      >
        Add Hobby
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={hobbies}
        renderItem={hobby => (
          <List.Item
            actions={[
              <EditOutlined key="edit" onClick={() => showModal(hobby)} />,
              <DeleteOutlined
                key="delete"
                onClick={() => handleDeleteHobby(hobby.id)}
              />,
            ]}
          >
            <List.Item.Meta title={hobby.description} />
          </List.Item>
        )}
      />
      <Modal
        title={currentHobby ? 'Edit Hobby' : 'Add Hobby'}
        visible={isModalVisible}
        onOk={currentHobby ? handleUpdateHobby : handleAddHobby}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter hobby description"
          value={hobbyDescription}
          onChange={e => setHobbyDescription(e.target.value)}
        />
      </Modal>
    </PageLayout>
  )
}
